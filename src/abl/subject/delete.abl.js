import { SubjectDAO } from "../../dao/subject.dao.js";

export async function DeleteAbl(req, res) {
	let result;
	try {
		result = await SubjectDAO.delete(req.body.id);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
