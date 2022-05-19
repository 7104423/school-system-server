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

router.get(
  "/",
  authenticate(),
  availableFor(["STUDENT"]),
  /**
   * @param {Request} req
   * @param {Response} res
   */
  (req, res) => {
    res.json({ message: "This section is available only for students" });
  }
);

// update
// @TODO

// delete
// @TODO

export default router;
