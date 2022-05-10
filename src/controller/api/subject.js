import { Router } from "express";
import { authenticate, availableFor } from "../../utils";
import { Request, Response } from "express";
import { SubjectDAO } from "./../../dao/subject.dao";

const router = Router();

router.post(
  "/create",
  authenticate(),
  availableFor(["ADMIN"]),
  async (req, res) => {
    let result;
    try {
      result = await SubjectDAO.create(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
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
      res.status(500).json({ error });
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
      res.status(500).json({ error });
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
      result = await SubjectDAO.update(req.body.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
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
      res.status(500).json({ error });
    }
  }
);

export default router;
