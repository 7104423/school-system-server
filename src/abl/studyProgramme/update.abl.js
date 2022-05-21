import { StudyProgrammeDAO } from "../../dao/studyProgramme.dao.js";
import { validateUpdate } from "../../validator/studyProgramme.validator.js";

export async function UpdateAbl(req, res) {
	let result;
	try {
		if (!validateUpdate(req.body)) {
			throw new Error("Validation failed");
		}
		result = await StudyProgrammeDAO.update(req.body.id, req.body);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
