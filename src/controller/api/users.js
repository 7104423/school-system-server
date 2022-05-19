import { Router } from "express";
import { authenticate, availableFor } from "../../utils";
import { Request, Response } from "express";
import { UserDAO } from "../../dao/user.dao.js";
import {
  validateCreate,
  validateUpdate
} from "../../validator/user.validator.js";

const router = Router();

// create user
// @TODO

// list all users
router.get(
  "/list",
  authenticate(),
  availableFor(["ADMIN"]),
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
// @TODO

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
