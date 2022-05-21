import { ContentDAO } from "../../dao/content.dao.js";
import { validateUpdate } from "../../validator/content.validator.js";

export async function UpdateAbl(req, res) {
	let result;
	try {
		if (!validateUpdate(req.body)) {
			throw new Error("Validation failed");
		}
		result = await ContentDAO.update(req.body.id, req.body);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
