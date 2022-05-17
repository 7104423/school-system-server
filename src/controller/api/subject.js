import { Router } from "express";
import { authenticate, availableFor } from "../../utils";
import { SubjectDAO } from "./../../dao/subject.dao";
import {
  validateCreate,
  validateUpdate,
} from "../../validator/subject.validator.js";
import { TopicDAO } from "../../dao/topic.dao";
import { ContentDAO } from "../../dao/content.dao";

const router = Router();

router.post(
  "/create",
  authenticate(),
  availableFor(["ADMIN"]),
  async (req, res) => {
    let result;
    try {
      if (!validateCreate(req.body)) {
        throw new Error("Validation failed");
      }
      result = await SubjectDAO.create(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/list",
  authenticate(),
  availableFor(["ADMIN", "STUDENT", "TEACHER"]),
  async (req, res) => {
    let result;
    try {
      result = await SubjectDAO.list();
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/:id/topics",
  authenticate(),
  availableFor(["ADMIN", "STUDENT", "TEACHER"]),
  async (req, res) => {
    let result;
    try {
      result = await TopicDAO.getSubjectsWithContents(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/:id/contents",
  authenticate(),
  availableFor(["ADMIN", "STUDENT", "TEACHER"]),
  async (req, res) => {
    let result;
    try {
      result = await ContentDAO.getBySubject(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/:id",
  authenticate(),
  availableFor(["ADMIN", "STUDENT", "TEACHER"]),
  async (req, res) => {
    let result;
    try {
      result = await SubjectDAO.get(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.post(
  "/update",
  authenticate(),
  availableFor(["ADMIN", "TEACHER"]),
  async (req, res) => {
    let result;
    try {
      if (!validateUpdate(req.body)) {
        throw new Error("Validation failed");
      }
      result = await SubjectDAO.update(req.body.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.post(
  "/delete",
  authenticate(),
  availableFor(["ADMIN"]),
  async (req, res) => {
    let result;
    try {
      result = await SubjectDAO.delete(req.body.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
