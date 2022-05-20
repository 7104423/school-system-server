import mongoose from "mongoose";
import { SubjectModel } from "../model/subject.model.js";

function parseToPlainObject(obj) {
  return {
    id: obj._id,
    name: obj.name,
    goal: obj.goal,
    credits: obj.credits,
    supervisor: obj.supervisor,
    teachers: obj.teachers,
    language: obj.language,
    studyProgramme: obj.studyProgramme,
  };
}

export class SubjectDAO {
  constructor({
    id,
    _id = "",
    name,
    goal,
    credits,
    supervisor,
    teachers,
    language,
    studyProgramme,
  }) {
    this.id = id || _id || "";
    this.name = name || "";
    this.goal = goal || "";
    this.credits = credits || 0;
    this.supervisor = supervisor || "";
    this.teachers = teachers || [];
    this.language = language || "";
    this.studyProgramme = studyProgramme || "";
  }

  /**
   * create subject
   */
  static async create(data) {
    let subject = {
      name: data.name,
      goal: data.goal,
      credits: data.credits,
      supervisor: data.supervisor,
      teachers: data.teachers,
      language: data.language,
      studyProgramme: data.studyProgramme,
    };
    const result = await SubjectModel.create(subject);
    return new this(parseToPlainObject(result));
  }

  /**
   * get subject
   */
  static async get(id) {
    const result = await SubjectModel.findById(id)
      .populate("supervisor", {
        name: 1,
        surname: 1,
      })
      .populate("teachers", {
        name: 1,
        surname: 1,
      })
      .populate({
        path: "studyProgramme",
        name: 1,
        degree: 1,
        populate: {
          path: "students",
          name: 1,
          surname: 1,
        },
      });
    if (!result) {
      return null;
    }
    return new this(parseToPlainObject(result));
  }

  /**
   * list all subjects
   */
  static async list() {
    const array = await SubjectModel.find()
      .populate("supervisor", {
        name: 1,
        surname: 1,
      })
      .populate("studyProgramme", {
        name: 1,
        degree: 1,
      });
    if (!array) {
      return null;
    }
    const result = array.map((obj) => new this(parseToPlainObject(obj)));
    return result;
  }

  /**
   * update subject
   */
  static async update(id, data) {
    let subject = {
      name: data.name,
      goal: data.goal,
      credits: data.credits,
      subject: data.subject,
      supervisor: data.supervisor,
      teachers: data.teachers,
      language: data.language,
      studyProgramme: data.studyProgramme,
    };
    const result = await SubjectModel.findByIdAndUpdate(id, subject, {
      returnDocument: "after",
    });
    return new this(parseToPlainObject(result));
  }

  /**
   * delete subject
   */
  static async delete(id) {
    const result = await SubjectModel.findByIdAndDelete(id);
    return new this(parseToPlainObject(result));
  }
}
