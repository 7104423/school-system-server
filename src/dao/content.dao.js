import mongoose from "mongoose";
import { ContentModel } from "../model/content.model.js";

function parseToPlainObject(obj) {
  return {
    id: obj._id,
    type: obj.type,
    content: obj.content,
    subject: obj.subject,
    topic: obj.topic,
  };
}

export class ContentDAO {
  constructor({ id, _id = "", type, content, subject, topic }) {
    this.id = id || _id || "";
    this.type = type || "";
    this.content = content || "";
    this.subject = subject || "";
    this.topic = topic || "";
  }

  /**
   * create content
   */
  static async create(data) {
    let content = {
      type: data.type,
      content: data.content,
      subject: data.subject,
      topic: data.topic,
    };
    const result = await ContentModel.create(content);
    return new this(parseToPlainObject(result));
  }

  /**
   * get content
   */
  static async get(id) {
    const result = await ContentModel.findById(id)
      .populate("subject", { name: true })
      .populate("topic", { name: true });
    if (!result) {
      return null;
    }
    return new this(parseToPlainObject(result));
  }

  /**
   * list all contents
   */
  static async list() {
    const array = await ContentModel.find()
      .populate("subject", { name: true })
      .populate("topic", { name: true });
    if (!array) {
      return null;
    }
    const result = array.map((obj) => new this(parseToPlainObject(obj)));
    return result;
  }

  /**
   * update content
   */
  static async update(id, data) {
    let content = {
      type: data.type,
      content: data.content,
      subject: data.subject,
      topic: data.topic,
    };
    const result = await ContentModel.findByIdAndUpdate(id, content, {
      returnDocument: "after",
    });
    return new this(parseToPlainObject(result));
  }

  /**
   * delete content
   */
  static async delete(id) {
    const result = await ContentModel.findByIdAndDelete(id);
    return new this(parseToPlainObject(result));
  }

  static async deleteQuery(query) {
    const result = await ContentModel.remove(query);
    return new this(parseToPlainObject(result));
  }

  /**
   * Get subjects to the related topic
   */
  static async getBySubject(id) {
    const result = await ContentModel.aggregate([
      {
        $match: {
          subject: new mongoose.Types.ObjectId(id),
        },
      },
    ]);
    if (!result) {
      return [];
    }
    return result.map((el) => new this(parseToPlainObject(el)));
  }

  /**
   * Get subjects to the related topic
   */
  static async getByTopic(id) {
    const result = await ContentModel.aggregate([
      {
        $match: {
          topic: new mongoose.Types.ObjectId(id),
        },
      },
    ]);
    if (!result) {
      return [];
    }
    return result.map((el) => new this(parseToPlainObject(el)));
  }
}
