import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { GroupSchema } from "./group.model";

const ObjectId = Schema.Types.ObjectId;

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  thirdPartyIdentity: Boolean,
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
  },
  resetPassword: {
    type: Boolean,
    default: false,
  },
  groups: {
    type: [
      {
        _id: {
          type: ObjectId,
          ref: "groups",
        },
        name: String,
      },
    ],
    required: true,
  },
});

// @ts-ignore
UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const UserModel = mongoose.model("user", UserSchema);
