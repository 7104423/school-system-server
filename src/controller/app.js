import { Router } from "express";
import path from "path";
import { authenticate } from "../utils";

const router = Router();

router.get("/*", authenticate(), (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "public", "index.html"));
});

export default router;
