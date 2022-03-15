import { Router } from "express";
import { signup } from "../../utils";
import { Request, Response } from "express";

const router = Router();

router.post(
  "/",
  signup(),
  /**
   * @param {Request} req
   * @param {Response} res
   */
  async (req, res) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

export default router;
