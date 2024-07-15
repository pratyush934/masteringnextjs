import mongoose, { Document, Schema } from "mongoose";

export interface Prompt extends Document {
  prompt: string;
  creator: Schema.Types.ObjectId;
  tag: string;
}

export const promptUserSchema: Schema<Prompt> = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    requried: [true, "Prompt ke bina kaam kaise chalega"],
  },
  tag: {
    type: String,
    required: [true, "Tag is imp re baba"],
  },
});

// ye line bahut jaruri

export const promptModel =
  (mongoose.models.Prompt as mongoose.Model<Prompt>) ||
  mongoose.model<Prompt>("Prompt", promptUserSchema);

  