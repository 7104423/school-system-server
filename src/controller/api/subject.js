import { Router } from "express";
import { authenticate, availableFor } from "../../utils";
import { SubjectDAO } from "./../../dao/subject.dao";
import {
  validateCreate,
  validateUpdate,
} from "../../validator/subject.validator.js";
import { TopicDAO } from "../../dao/topic.dao";
import { ContentDAO } from "../../dao/content.dao";
import { CreateAbl } from "../../abl/subject/create.abl.js";
import { ListAbl } from "../../abl/subject/list.abl.js";
import { GetTopicsAbl } from "../../abl/subject/getTopics.abl.js";
import { GetContentsAbl } from "../../abl/subject/getContents.abl.js";
import { GetAbl } from "../../abl/subject/get.abl.js";
import { UpdateAbl } from "../../abl/subject/update.abl.js";
import { DeleteAbl } from "../../abl/subject/delete.abl.js";

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
  "/:id/topics",
  authenticate(),
  availableFor(["ADMIN", "STUDENT", "TEACHER"]),
  async (req, res) => {
    await GetTopicsAbl(req, res);
  }
);

router.get(
  "/:id/contents",
  authenticate(),
  availableFor(["ADMIN", "STUDENT", "TEACHER"]),
  async (req, res) => {
    await GetContentsAbl(req, res);
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
  availableFor(["ADMIN"]),
  async (req, res) => {
    await DeleteAbl(req, res);
  }
);

export default router;
