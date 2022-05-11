import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export const SubjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  goal: String,
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

export const SubjectModel = mongoose.model("subject", SubjectSchema);
