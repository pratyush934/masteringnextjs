import { promptModel } from "@/models/prompt.model";
import { dbConnect } from "@/utils/db";

export async function POST(req: Request) {
  const { userId, prompt, tag } = await req.json();

  console.log(prompt);

  try {
    await dbConnect();

    const newPormpt = new promptModel({
        creator: userId,
        prompt,
        tag
    })

    console.log(newPormpt);

    await newPormpt.save();

    // const prompts = await promptModel.find({}).populate("creator");

    return new Response(JSON.stringify(newPormpt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
}
