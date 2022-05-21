import { ContentDAO } from "../../dao/content.dao.js";

export async function ListAbl(req, res) {
	let result;
	try {
		result = await ContentDAO.list();
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
