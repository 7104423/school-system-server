import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export const StudyProgrammeSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  description: String,
  supervisor: ObjectId
});

export const StudyProgrammeModel = mongoose.model("studyProgramme", StudyProgrammeSchema);
