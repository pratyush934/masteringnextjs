import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  email: string;
  username: string;
  image: string;
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
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username is invalid, it should contain 8-20 alphanumeric characters and be unique!",
    ],
  },

  // username: {
  //   type: String,
  //   required: [true, "UserName is required"],
  //   // match: [
  //   //   /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
  //   //   "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
  //   // ],
  // },
  image: {
    type: String,
  },
});

//remeber this line

export const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);
