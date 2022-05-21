import { StudyProgrammeDAO } from "../../dao/studyProgramme.dao.js";

export async function GetAbl(req, res) {
	let result;
	try {
		result = await StudyProgrammeDAO.get(req.params.id);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
