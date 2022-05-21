import { Router } from "express";
import { authenticate, availableFor } from "../../utils";
import { Request, Response } from "express";
import { UserDAO } from "../../dao/user.dao.js";
import { GroupDAO } from "../../dao/group.dao.js";
import bcrypt from "bcrypt";
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
    
    // email is missing
    if (!req.body.email) {
      return res.status(400).json({ message: "Email is missing." });
    }

    // email is already taken
    if ( await UserDAO.findByEmail(req.body.email) ) {
      return res.status(400).json({ message: "Email is already taken. Use other email." });
    }

    // name is missing
    if (!req.body.name) {
      return res.status(400).json({ message: "Name is missing." });
    }

    // surname is missing
    if (!req.body.surname) {
      return res.status(400).json({ message: "Surname is missing." });
    }

    // pasword is missing????

    // groups are missing
    if (req.body.groups.length === 0) {
      return res.status(400).json({ message: "Groups are missing." });
    }

    // check groups
    let groups = await GroupDAO.list();
    let groupsParsed = groups.map( (item) => item.name );
    let groupValidationFailed = false;
    req.body.groups.forEach( (item) => {
      if (!groupsParsed.includes(item)) {
        groupValidationFailed = true;
        return;
      }
    } );
    if (groupValidationFailed) {
      return res.status(400).json({ message: `Unsupported role. Supported roles: ${groupsParsed.join(" ")}.` })
    }
    
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

// update password
router.post(
  "/update/password",
  authenticate(),
  availableFor(["ADMIN", "$_CURRENT_USER"]),
  async (req, res) => {
    let result;
    try {
      const { password } = req.body;
      result = await UserDAO.updatePassword(req.body.id, password);
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
