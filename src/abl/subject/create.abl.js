import { SubjectDAO } from "../../dao/subject.dao.js";
import { validateCreate } from "../../validator/subject.validator.js";

export async function CreateAbl(req, res) {
	let result;
	try {
		if (!validateCreate(req.body)) {
			throw new Error("Validation failed");
		}
		result = await SubjectDAO.create(req.body);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
