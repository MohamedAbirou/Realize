import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { storage } from "@/lib/firebaseConfig";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ref, uploadString } from "firebase/storage";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key is not configured", {
        status: 500,
      });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("resolution is required", { status: 400 });
    }

    const freetrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freetrial && !isPro) {
      return new NextResponse("Free trial has expired!", { status: 403 });
    }

    const res = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
      quality: "hd",
      style: "natural",
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    // Store the generated data in Firebase Storage
    const storageRef = ref(
      storage,
      `generatedImages/${userId}-${Date.now()}.json`
    );
    await uploadString(storageRef, JSON.stringify(res.data), "raw");

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
