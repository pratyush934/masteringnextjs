import { promptModel } from "@/models/prompt.model";
import { dbConnect } from "@/utils/db";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const prompts = await promptModel.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
}
