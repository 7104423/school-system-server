import { UserDAO } from "../../dao/user.dao.js";

export async function GetAbl(req, res) {
	let result;
	try {
		result = await UserDAO.findByID(req.params.id);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
