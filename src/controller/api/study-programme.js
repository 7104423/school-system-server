import { Router } from "express";
import { authenticate, availableFor } from "../../utils";
import { StudyProgrammeDAO } from "./../../dao/studyProgramme.dao.js";
import {
  validateCreate,
  validateUpdate,
} from "../../validator/studyProgramme.validator.js";
import { CreateAbl } from "../../abl/studyProgramme/create.abl.js";
import { ListAbl } from "../../abl/studyProgramme/list.abl.js";
import { GetAbl } from "../../abl/studyProgramme/get.abl.js";
import { UpdateAbl } from "../../abl/studyProgramme/update.abl.js";
import { DeleteAbl } from "../../abl/studyProgramme/delete.abl.js";

const router = Router();

router.post(
  "/create",
  authenticate(),
  availableFor(["ADMIN"]),
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
  availableFor(["ADMIN"]),
  async (req, res) => {
    await UpdateAbl(req, res);
  }
);

router.post(
  "/delete",
  authenticate(),
  availableFor(["ADMIN"]),
  async (req, res) => {
    await DeleteAbl(req, res);
  }
);

export default router;
