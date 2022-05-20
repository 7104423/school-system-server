import { Router } from "express";
import { authenticate, availableFor } from "../../utils";
import { Request, Response } from "express";
import { UserDAO } from "../../dao/user.dao.js";
import {
  validateCreate,
  validateUpdate,
} from "../../validator/user.validator.js";

const router = Router();

// create user
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
      result = await UserDAO.create(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// list all users
router.get(
  "/list",
  authenticate(),
  availableFor(["ADMIN", "STUDENT", "TEACHER"]),
  async (req, res) => {
    let result;
    try {
      result = await UserDAO.list();
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// list all teachers
router.get(
  "/enum/teachers",
  authenticate(),
  availableFor(["ADMIN", "TEACHER"]),
  async (req, res) => {
    let result;
    try {
      result = await UserDAO.getTeachers();
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// list all students
router.get(
  "/enum/students",
  authenticate(),
  availableFor(["ADMIN", "TEACHER"]),
  async (req, res) => {
    let result;
    try {
      result = await UserDAO.getStudents();
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// get user by id
router.get(
  "/:id",
  authenticate(),
  availableFor(["ADMIN"]),
  async (req, res) => {
    let result;
    try {
      result = await UserDAO.findByID(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// update
router.post(
  "/update",
  authenticate(),
  availableFor(["ADMIN"]),
  async (req, res) => {
    let result;
    try {
      if (!validateUpdate(req.body)) {
        throw new Error("Validation failed");
      }
      result = await UserDAO.update(req.body.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// delete
router.post(
  "/delete",
  authenticate(),
  availableFor(["ADMIN"]),
  async (req, res) => {
    let result;
    try {
      result = await UserDAO.delete(req.body.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;