import { IUser } from "@libs/types";
import UserModel, { UserDoc } from "@models/User.model";
import { FilterQuery } from "mongoose";

class UserService {
  findUser = async (filter: FilterQuery<UserDoc>) => {
    const user = await UserModel.findOne(filter);
    return user;
  };

  createUser = async (data: IUser) => {
    const user = await UserModel.create(data);
    return user;
  };
}

export default new UserService();
