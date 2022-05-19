import mongoose, { Schema } from "mongoose";

export const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
});

export const GroupModel = mongoose.model("group", GroupSchema);
