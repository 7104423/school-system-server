import passport from "passport";
import { Router } from "express";
import { signup } from "../utils";

const router = Router();

router.post("/", signup(), async (req, res) => {
  res.json({
    message: "Signup successful",
    user: req.user,
  });
});

export default router;
