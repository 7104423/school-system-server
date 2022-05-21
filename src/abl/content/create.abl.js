import { ContentDAO } from "../../dao/content.dao.js";
import { validateCreate } from "../../validator/content.validator.js";

export async function CreateAbl(req, res) {
	let result;
	try {
		if (!validateCreate(req.body)) {
			throw new Error("Validation failed");
		}
		result = await ContentDAO.create(req.body);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
