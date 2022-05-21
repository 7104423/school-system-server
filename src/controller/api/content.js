import { Router } from "express";
import { authenticate, availableFor } from "../../utils";
import { CreateAbl } from "../../abl/content/create.abl.js";
import { ListAbl } from "../../abl/content/list.abl.js";
import { GetAbl } from "../../abl/content/get.abl.js";
import { UpdateAbl } from "../../abl/content/update.abl.js";
import { DeleteAbl } from "../../abl/content/delete.abl.js";

const router = Router();

router.post(
  "/create",
  authenticate(),
  availableFor(["ADMIN", "TEACHER"]),
  async (req, res) => {
    await CreateAbl(req, res);
  }
);

router.get(
  "/list",
  authenticate(),
  availableFor(["ADMIN", "STUDENT", "TEACHER"]),
  async (req, res) => {
    await ListAbl(req, res);
  }
);

router.get(
  "/:id",
  authenticate(),
  availableFor(["ADMIN", "STUDENT", "TEACHER"]),
  async (req, res) => {
    await GetAbl(req, res);
  }
);

router.post(
  "/update",
  authenticate(),
  availableFor(["ADMIN", "TEACHER"]),
  async (req, res) => {
    await UpdateAbl(req, res);
  }
);

router.post(
  "/delete",
  authenticate(),
  availableFor(["ADMIN", "TEACHER"]),
  async (req, res) => {
    await DeleteAbl(req, res);
  }
);

export default router;
