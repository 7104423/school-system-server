import { ContentDAO } from "../../dao/content.dao.js";

export async function GetContentsAbl(req, res) {
	let result;
	try {
		result = await ContentDAO.getByTopic(req.params.id);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
