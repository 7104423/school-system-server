import { SubjectDAO } from "../../dao/subject.dao.js";

export async function ListAbl(req, res) {
	let result;
	try {
		result = await SubjectDAO.list();
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
