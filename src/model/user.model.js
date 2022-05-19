import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { GroupSchema } from "./group.model";

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPassword: {
    type: Boolean,
    default: false,
  },
  groups: [GroupSchema],
});

// @ts-ignore
UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const UserModel = mongoose.model("user", UserSchema);
