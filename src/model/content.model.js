import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export const ContentSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  subject: ObjectId,
  topic: ObjectId
});

export const ContentModel = mongoose.model("content", ContentSchema);
