import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { GroupSchema } from "./group.model";

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  groups: [GroupSchema],
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isValidPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model("User", UserSchema);
