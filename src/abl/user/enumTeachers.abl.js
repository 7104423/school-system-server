import { UserDAO } from "../../dao/user.dao.js";

export async function EnumTeachersAbl(req, res) {
	let result;
	try {
		result = await UserDAO.getTeachers();
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
