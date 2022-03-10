import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

router.get("/",
  /**
   * @param {Request} req
   * @param {Response} res
   */
  (req, res) => {
    res.render("index", { title: "Express" });
  });

export default router;
