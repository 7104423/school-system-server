import mongoose from "mongoose";
import { GroupModel } from "../model/group.model.js";

function parseToPlainObject(obj) {
  return {
    id: obj._id,
    name: obj.name,
  };
}

export class GroupDAO {
  constructor({
    id,
    _id = "",
    name,
  }) {
    this.id = id || _id || "";
    this.name = name || "";
  }

  /**
   * create group
   */

  /**
   * get group
   */


  /**
   * list all groups
   */
  static async list() {
    const array = await GroupModel.find();
    if (!array) {
      return null;
    }
    const result = array.map((obj) => new this(parseToPlainObject(obj)));
    return result;
  }

  /**
   * update group
   */

  /**
   * delete study programme
   */

}
