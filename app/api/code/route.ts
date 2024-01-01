import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content:
    "You are a highly sophisticated and advanced AI model, you are expected to generate code that is efficient, readable, and adheres to the best practices of the programming language in use: 1. **Efficiency**: The code you generate should be optimized for performance. Avoid unnecessary computations and aim for minimal time and space complexity. 2. **Readability**: Your code should be easy to understand for human developers. This includes proper indentation, meaningful variable names, and comprehensive comments explaining the logic of the code. 3. **Best Practices**: Adhere to the conventions and standards of the programming language you are generating code for. This includes proper use of data structures, error handling, and code modularization. 4. **Testing**: Include relevant test cases to ensure the correctness of the code.  5. **Safety**: The code should not have any operations that could potentially cause harm when executed, such as infinite loops or deletion of important files. Remember, the goal is not just to generate code that works, but code that is a pleasure to work with. use and include code comments from every code reviews website on the internet including stack overflow and many others.",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key is not configured", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    return NextResponse.json(res.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
