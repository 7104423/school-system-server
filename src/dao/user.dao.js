import mongoose from "mongoose";
import { UserModel } from "../model";
import { GroupTypes } from "../types";
import { Request } from "express";
import bcrypt from "bcrypt";

function parseToPlainObject(obj) {
  return {
    id: obj._id,
    email: obj.email,
    name: obj.name,
    surname: obj.surname,
    password: obj.password,
    groups: obj.groups,
  };
}

export class UserDAO {
  /**
   * @param {{
   *  id?: string,
   *  _id?: string,
   *  email?: string,
   *  name?: string,
   *  surname?: string,
   *  password?: string,
   *  groups?: GroupTypes[]
   * }} param0
   */
  constructor({ id, _id, email, name, surname, password, groups }) {
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
    this.name = name || "";

    /**
     * @type {string}
     */
    this.surname = surname || "";

    /**
     * @type {string}
     */
    this.password = password || "";
    /**
     * @type {GroupTypes[]}
     */
    this.groups = groups || [];
  }

  /**
   * @param {string} email
   * @param {string} password
   * @param {GroupTypes[]?} groups
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
    return new this(parseToPlainObject(user));
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
    return new this(parseToPlainObject(user));
  }

  /**
   * @param {Request} req
   * @returns {UserDAO | null}
   */
  static getSessionUser(req) {
    if (req.user instanceof UserDAO) {
      return req.user;
    }
    return null;
  }

  /**
   * @param {GroupTypes[]} groups
   * @returns {Promise<boolean>}
   */
  async hasGroup(groups = []) {
    const userID = new mongoose.Types.ObjectId(this.id);
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
  isValidPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}
