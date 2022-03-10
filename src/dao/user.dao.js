import mongoose from "mongoose";
import { UserModel } from "../model";
import { GroupTypes } from "../types";

export class UserDAO {

  /**
   * @param {{
   *  id?: string,
   *  _id?: string,
   *  email?: string,
   *  password?: string,
   *  groups?: GroupTypes
   * }} param0
   */
  constructor({ id, _id, email, password, groups }) {
    /**
     * @type {string}
     */
    this.id = id || _id || "";
    /**
     * @type {string}
     */
    this.email = email || "";
    /**
     * @type {string}
     */
    this.password = password || "";
    /**
     * @type {GroupTypes}
     */
    this.groups = groups || [];
  }

  /**
   * @param {string} email
   * @param {string} password
   * @param {string?} groups
   * @returns {Promise<UserDAO>}
   */
  static async create(email, password, groups = ["STUDENT"]) {
    await UserModel.create({ email, password });
    return new this({ email, password, groups });
  }

  /**
   * @param {string} emailValue
   * @returns {Promise<UserDAO | null>}
   */
  static async findByEmail(emailValue) {
    const user = await UserModel.findOne({
      email: emailValue,
    });
    if (!user) {
      return null;
    }
    return new this({ ...user });
  }

  /**
   * @param {string} id
   * @returns {Promise<UserDAO | null>}
   */
  static async findByID(id) {
    const user = await UserModel.findOne({
      _id: id,
    });
    if (!user) {
      return null;
    }
    return new this({ ...user });
  }

  /**
   * @param {GroupTypes} groups
   * @returns {Promise<boolean>}
   */
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

  /**
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  async isValidPassword(password) {
    return UserModel.findById(this.id).isValidPassword(password);
  }
}
