import { TopicDAO } from "../../dao/topic.dao.js";

export async function ListAbl(req, res) {
	let result;
	try {
		result = await TopicDAO.list();
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
