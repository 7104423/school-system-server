import mongoose from "mongoose";
import { GroupModel, UserModel } from "../model";
import { GroupTypes } from "../types";
import { Request } from "express";
import bcrypt from "bcrypt";

function parseToPlainObject(obj) {
  return {
    id: obj._id,
    email: obj.email,
    thirdPartyIdentity: obj.thirdPartyIdentity,
    name: obj.name,
    surname: obj.surname,
    password: obj.password,
    groups: obj.groups,
    resetPassword: obj.resetPassword,
  };
}

export class UserDAO {
  /**
   * @param {{
   *  id?: string,
   *  _id?: string,
   *  email?: string,
   *  thirdPartyIdentity?: boolean,
   *  name?: string,
   *  surname?: string,
   *  password?: string,
   *  groups?: GroupTypes[]
   *  resetPassword?: boolean
   * }} param0
   */
  constructor({
    id,
    _id,
    email,
    thirdPartyIdentity,
    name,
    surname,
    password,
    groups,
    resetPassword,
  }) {
    /**
     * @type {string}
     */

    this.id = id || _id || "";
    /**
     * @type {string}
     */
    this.email = email || "";

    /**
     * @type {boolean}
     */
    this.thirdPartyIdentity = thirdPartyIdentity || false;

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

    this.resetPassword = resetPassword || false;
  }

  /**
   * create user
   */
  static async create(user) {
    const relatedGroups = await Promise.all(
      user.groups.map((name) => {
        let result = GroupModel.find({ name });
        return result;
      })
    );
    /**
     * @FIX: Promise.all vyse uklada do relatedGroups "pole polí objektů", proto nasledujici blok kodu odstrani "vnejsi" pole tak, aby bylo vraceno pouze "pole objektů"...
     */
    user.groups = [];
    for (let i = 0; i < relatedGroups.length; i++) {
      user.groups.push(relatedGroups[i][0]);
    }

    const result = await UserModel.create(user);
    return new this(result);
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
   * list all users
   */
  static async list() {
    const array = await UserModel.find();
    if (!array) {
      return null;
    }
    const result = array.map((obj) => new this(parseToPlainObject(obj)));
    return result;
  }

  /**
   * list all teachers
   */
  static async getTeachers() {
    const array = await UserModel.find({ "groups.name": "TEACHER" });
    if (!array) {
      return null;
    }
    const result = array.map((obj) => new this(parseToPlainObject(obj)));
    return result;
  }

  /**
   * list all students
   */
  static async getStudents() {
    const array = await UserModel.find({ "groups.name": "STUDENT" });
    if (!array) {
      return null;
    }
    const result = array.map((obj) => new this(parseToPlainObject(obj)));
    return result;
  }

  static async updatePassword(id, password) {
    const cryptedPassword = await bcrypt.hash(password, 10);
    const result = await UserModel.findByIdAndUpdate(
      id,
      { password: cryptedPassword, resetPassword: false },
      {
        returnDocument: "after",
      }
    );
    return result;
  }

  /**
   * update user
   */
  static async update(id, data) {
    let user = await UserModel.findOne({ _id: id });

    let updatedUser = {
      email: data.email,
      thirdPartyIdentity: data.thirdPartyIdentity,
      name: data.name,
      surname: data.surname,
      password: user.password,
      resetPassword: data.resetPassword,
      groups: data.groups,
    };

    const relatedGroups = await Promise.all(
      updatedUser.groups.map((name) => {
        let result = GroupModel.find({ name });
        return result;
      })
    );
    /**
     * @FIX: Promise.all vyse uklada do relatedGroups "pole polí objektů", proto nasledujici blok kodu odstrani "vnejsi" pole tak, aby bylo vraceno pouze "pole objektů"...
     */
    updatedUser.groups = [];
    for (let i = 0; i < relatedGroups.length; i++) {
      updatedUser.groups.push(relatedGroups[i][0]);
    }

    const result = await UserModel.findByIdAndUpdate(id, updatedUser, {
      returnDocument: "after",
    });

    return new this(result);
  }

  /**
   * delete user
   */
  // @TODO
  static async delete(id) {
    const result = await UserModel.findByIdAndDelete(id);
    return new this(parseToPlainObject(result));
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
