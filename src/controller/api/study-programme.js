import { Router } from "express";
import { authenticate, availableFor } from "../../utils";
import { Request, Response } from "express";
import { StudyProgrammeDAO } from "./../../dao/studyProgramme.dao.js";

const router = Router();

router.post("/create", authenticate(), availableFor(["ADMIN"]), async (req, res) => {
	let result;
	try {
		result = await StudyProgrammeDAO.create(req.body)
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/:id", authenticate(), availableFor(["ADMIN", "STUDENT", "TEACHER"]), async (req, res) => {
	let result;
	try {
		result = await StudyProgrammeDAO.get(req.params.id);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// @TODO: fix this, this route doesn't work...
router.get( "/list", authenticate(), availableFor(["ADMIN", "STUDENT", "TEACHER"]), async ( req, res ) => {
	let result;
	try {
		result = await StudyProgrammeDAO.list();
		res.json( result );
	} catch ( error ) {
		res.status(500).json( { message: error.message } );
	}
} );

router.post("/update", authenticate(), availableFor(["ADMIN"]), async (req, res) => {
	let result;
	try {
		result = await StudyProgrammeDAO.update(req.body.id, req.body);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/delete", authenticate(), availableFor(["ADMIN"]), async (req, res) => {
	let result;
	try {
		result = await StudyProgrammeDAO.delete(req.body.id);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default router;
