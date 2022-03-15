import { Router } from "express";
import { authenticate, availableFor } from "../../utils";
import { Request, Response } from "express";

const router = Router();

router.get(
  "/",
  authenticate(),
  availableFor(["STUDENT"]),
  /**
   * @param {Request} req
   * @param {Response} res
   */
  (req, res) => {
    res.json({ message: "This section is available only for students" });
  }
);

export default router;
