import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

const positivePrompt =
  "Exquisite footage of clownfish gracefully navigating through a vibrant coral reef ecosystem, captured in ultra-high-definition 8K resolution. The video quality is impeccable, worthy of a National Geographic award.";
const negativePrompt =
  "Avoid footage that appears overly saturated with blue hues, contains visible dust particles, or has excessive noise. The video should not look washed out, visually unappealing, distorted, or exhibit signs of damage.";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const freetrial = await checkApiLimit();

    if (!freetrial) {
      return new NextResponse("Free trial has expired!", { status: 403 });
    }

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt,
          instruction: {
            positive: positivePrompt,
            negative: negativePrompt,
          },
        },
      }
    );

    await increaseApiLimit();

    return NextResponse.json(response);
  } catch (error) {
    console.log("[VIDEO_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
