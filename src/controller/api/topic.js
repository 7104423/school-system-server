import { Router } from "express";
import { authenticate, availableFor } from "../../utils";
import { Request, Response } from "express";
import { TopicDAO } from "./../../dao/topic.dao.js";
import {
  validateCreate,
  validateUpdate,
} from "../../validator/topic.validator.js";

const router = Router();

router.post(
  "/create",
  authenticate(),
  availableFor(["ADMIN", "TEACHER"]),
  async (req, res) => {
    let result;
    try {
      if (!validateCreate(req.body)) {
        throw new Error("Validation failed");
      }
      result = await TopicDAO.create(req.body);
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
      result = await TopicDAO.list();
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
      result = await TopicDAO.get(req.params.id);
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
      result = await TopicDAO.update(req.body.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.post(
  "/delete",
  authenticate(),
  availableFor(["ADMIN", "TEACHER"]),
  async (req, res) => {
    let result;
    try {
      result = await TopicDAO.delete(req.body.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
