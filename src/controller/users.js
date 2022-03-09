import { Router } from "express";
import { authenticate, availableFor } from "../utils";

const router = Router();

router.get("/", authenticate(), availableFor(["STUDENT"]), (req, res) => {
  res.json({ message: "This section is available only for students" });
});

export default router;
