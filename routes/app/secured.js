import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Signup successful",
    user: req.user,
  });
});

export default router;
