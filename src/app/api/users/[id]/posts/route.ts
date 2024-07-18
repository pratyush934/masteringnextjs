import { promptModel } from "@/models/prompt.model";
import { dbConnect } from "@/utils/db";

export async function GET(req: Request, { params }: { params: any }) {
  const id = params.id;

  try {
    await dbConnect();

    const prompts = await promptModel
      .find({
        creator: id,
      })
      .populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(`Error exists in prompts users/id/posts`, error);
  }
}
