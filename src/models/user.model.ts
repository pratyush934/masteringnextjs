import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  email: string;
  username: string;
  image: string;
  id: string
}

export const userSchema: Schema<User> = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^[a-zA-Z0-9._]{4,20}$/,
      "Username should be 4-20 characters long and can contain letters, numbers, dots, and underscores.",
    ],
  },

  image: {
    type: String,
  },
});

//remeber this line

export const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);
