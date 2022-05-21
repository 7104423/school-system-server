import { TopicDAO } from "../../dao/topic.dao.js";

export async function DeleteAbl(req, res) {
	let result;
	try {
		result = await TopicDAO.delete(req.body.id);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
