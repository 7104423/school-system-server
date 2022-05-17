import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export const ContentSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  subject: {
    type: ObjectId,
    ref: "subject",
  },
  topic: {
    type: ObjectId,
    ref: "topic",
  },
});

export const ContentModel = mongoose.model("content", ContentSchema);
