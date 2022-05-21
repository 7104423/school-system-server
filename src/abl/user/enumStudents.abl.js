import { UserDAO } from "../../dao/user.dao.js";

export async function EnumStudentsAbl(req, res) {
	let result;
	try {
		result = await UserDAO.list();
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
