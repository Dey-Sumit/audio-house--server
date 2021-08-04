import { Request } from "express";
import mongoose from "mongoose";
type mongoose_id = string | mongoose.Types.ObjectId;

export interface ExtendedRequest extends Request {
  // not Express.Request 👆
  user: any;
  file: any;
}

// https://stackoverflow.com/questions/54030381/unable-to-extend-express-request-in-typescript

export interface IUser {
  phone?: string;
  name?: string;
  avatar?: string;
  activated?: boolean;
}
