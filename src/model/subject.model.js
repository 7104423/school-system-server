import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export const SubjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  goal: String,
  supervisor: {
    type: ObjectId,
    required: true
  },
  teachers: {
    type: [ObjectId],
    required: true
  },
  language: String,
  studyProgramme: {
    type: ObjectId,
    required: true
  }
});

export const SubjectModel = mongoose.model("subject", SubjectSchema);
