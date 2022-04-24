import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export const TopicSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  icon: String,
  subject: {
    type: ObjectId,
    required: true
  }
});

export const TopicModel = mongoose.model("topic", TopicSchema);
