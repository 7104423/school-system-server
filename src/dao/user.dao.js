import mongoose from "mongoose";
import { UserModel } from "../model";

export class UserDAO {
  constructor({ id, _id, email, password, groups }) {
    this.id = id || _id;
    this.email = email;
    this.password = password;
    this.groups = groups;
  }

  static async create(email, password, groups = ["STUDENT"]) {
    await UserModel.create({ email, password });
    return new this({ email, password, groups });
  }

  static async findByEmail(emailValue) {
    const user = await UserModel.findOne({
      email: emailValue,
    });
    if (!user) {
      return null;
    }
    return new this({ ...user });
  }

  static async findByID(id) {
    const user = await UserModel.findOne({
      _id: id,
    });
    if (!user) {
      return null;
    }
    return new this({ ...user });
  }

  async hasGroup(groups = []) {
    const userID = mongoose.Types.ObjectId(this.id);
    const user = await UserModel.aggregate([
      {
        $match: { _id: userID },
      },
      {
        $match: { groups: { $elemMatch: { key: { $in: groups } } } },
      },
    ]);
    if (!user) {
      return false;
    }
    return true;
  }

  async isValidPassword(password) {
    return UserModel.findById(this.id).isValidPassword(password);
  }
}
