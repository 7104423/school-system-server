import { TopicDAO } from "../../dao/topic.dao.js";
import { validateCreate } from "../../validator/topic.validator.js";

export async function CreateAbl(req, res) {
	let result;
	try {
		if (!validateCreate(req.body)) {
			throw new Error("Validation failed");
		}
		result = await TopicDAO.create(req.body);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
