import mongoose from "mongoose";
import { TopicModel } from "../model/topic.model.js";

function parseToPlainObject(obj) {
  return {
    id: obj._id,
    name: obj.name,
    description: obj.description,
    subject: obj.subject,
    contents: obj.contents,
  };
}

export class TopicDAO {
  constructor({ id, _id = "", name, description, subject, contents }) {
    this.id = id || _id || "";
    this.name = name || "";
    this.description = description || "";
    this.subject = subject || "";
    this.contents = contents || [];
  }

  /**
   * create topic
   */
  static async create(data) {
    let topic = {
      name: data.name,
      description: data.description,
      subject: data.subject,
    };
    const result = await TopicModel.create(topic);
    return new this(parseToPlainObject(result));
  }

  /**
   * get topic
   */
  static async get(id) {
    const result = await TopicModel.findById(id).populate("subject", {
      name: true,
    });
    if (!result) {
      return null;
    }
    return new this(parseToPlainObject(result));
  }

  /**
   * Get subjects to the related topic
   */
  static async getSubjectsWithContents(id) {
    const result = await TopicModel.aggregate([
      {
        $match: {
          subject: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "contents",
          localField: "_id",
          foreignField: "topic",
          as: "contents",
        },
      },
    ]);
    if (!result) {
      return [];
    }
    return result.map((el) => new this(parseToPlainObject(el)));
  }

  /**
   * list all topics
   */
  static async list() {
    const array = await TopicModel.find().populate("subject", {
      name: true,
    });
    if (!array) {
      return null;
    }
    const result = array.map((obj) => new this(parseToPlainObject(obj)));
    return result;
  }

  /**
   * update topic
   */
  static async update(id, data) {
    let topic = {
      name: data.name,
      description: data.description,
      subject: data.subject,
    };
    const result = await TopicModel.findByIdAndUpdate(id, topic, {
      returnDocument: "after",
    });
    return new this(parseToPlainObject(result));
  }

  /**
   * delete topic
   */
  static async delete(id) {
    const result = await TopicModel.findByIdAndDelete(id);
    return new this(parseToPlainObject(result));
  }

  static async deleteQuery(query) {
    const result = await TopicModel.remove(query);
    return new this(parseToPlainObject(result));
  }
}
