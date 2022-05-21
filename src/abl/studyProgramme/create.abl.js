import { StudyProgrammeDAO } from "../../dao/studyProgramme.dao.js";
import { validateCreate } from "../../validator/studyProgramme.validator.js";

export async function CreateAbl(req, res) {
	let result;
	try {
		if (!validateCreate(req.body)) {
			throw new Error("Validation failed");
		}
		result = await StudyProgrammeDAO.create(req.body);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
