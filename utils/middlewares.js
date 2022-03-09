import mongoose from "mongoose";
import UserModel from "../model/user.model";

/**
 * @param {Array.<'STUDENT' | 'TEACHER' | 'ADMIN'>} groups
 * @returns {(req, res, next) => Promise}
 */
export const availableFor =
  (groups = []) =>
  async (req, res, next) => {
    // eslint-disable-next-line no-underscore-dangle
    const userID = mongoose.Types.ObjectId(req?.user?._id);
    const user = await UserModel.aggregate([
      {
        $match: { _id: userID },
      },
      {
        $match: { groups: { $elemMatch: { name: { $in: groups } } } },
      },
    ]);
    if (!user) {
      return res.json({ status: "failed" });
    }
    return next();
  };
