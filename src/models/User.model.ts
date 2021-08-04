import { IUser } from "@libs/types";
import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema<UserDoc>(
  {
    phone: { type: String, required: true },
    name: { type: String, required: false },
    avatar: { type: String, required: false },
    activated: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<UserDoc>("User", userSchema, "users");

export type UserDoc = IUser & Document;
