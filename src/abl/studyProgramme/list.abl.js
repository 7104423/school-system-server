import { StudyProgrammeDAO } from "../../dao/studyProgramme.dao.js";

export async function ListAbl(req, res) {
	let result;
	try {
		result = await StudyProgrammeDAO.list();
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
