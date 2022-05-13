import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export const StudyProgrammeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: String,
  supervisor: {
    type: ObjectId,
    ref: "user",
    required: true,
  },
  students: {
    type: [ObjectId],
    ref: "user",
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
});

export const StudyProgrammeModel = mongoose.model(
  "studyProgramme",
  StudyProgrammeSchema
);
