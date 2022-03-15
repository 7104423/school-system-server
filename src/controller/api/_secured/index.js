import { Router } from "express";
import { Request, Response } from "express";
import { UserDAO } from "../../../dao/user.dao";

const router = Router();

router.get(
  "/",
  /**
   * @param {Request & {user?: UserDAO}} req
   * @param {Response} res
   */
  (req, res) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

export default router;
