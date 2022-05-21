import mongoose, { Schema } from "mongoose";
import { ContentModel } from "./content.model";
import { TopicModel } from "./topic.model";

const ObjectId = Schema.Types.ObjectId;

export const SubjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  goal: String,
  credits: Number,
  supervisor: {
    type: ObjectId,
    ref: "user",
    required: true,
  },
  teachers: {
    type: [ObjectId],
    ref: "user",
    required: true,
  },
  language: String,
  studyProgramme: {
    type: ObjectId,
    ref: "studyProgramme",
    required: true,
  },
});

// Cascade delete
SubjectSchema.pre("remove", function (next) {
  TopicModel.remove({ subject: this._id }).exec();
  ContentModel.remove({ subject: this._id }).exec();
  next();
});

export const SubjectModel = mongoose.model("subject", SubjectSchema);
