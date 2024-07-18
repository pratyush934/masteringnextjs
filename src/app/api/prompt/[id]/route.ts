//get

import { promptModel } from "@/models/prompt.model";
import { userModel } from "@/models/user.model";
import { dbConnect } from "@/utils/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const prompt = await promptModel.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not fount", { status: 404 });

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    console.log(`Error in prompt `, error);
  }
}

//patch

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { prompt, tag } = await req.json();

  try {
    await dbConnect();
    const existingPrompt = await promptModel.findById(params.id);

    if (!existingPrompt) {
      return new Response(`SO sad prompt not found`, { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("Successfully updated the prompts", { status: 200 });
  } catch (error) {
    console.log(`Error exist in PATCH route`, error);
    return new Response("Error updating prompt", { status: 500 });
  }
}

//delete
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const response = await promptModel.findByIdAndDelete(params.id);
    console.log("----><----", response);
    return new Response("Deleted Successfully", { status: 200 });
  } catch (error) {
    console.log(`Error exist in DELETE route`, error);
    return new Response("Not so good and is having error in DELETE route", {
      status: 500,
    });
  }
}
