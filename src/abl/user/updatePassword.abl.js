import { UserDAO } from "../../dao/user.dao.js";

export async function UpdatePasswordAbl(req, res) {
    let result;
    try {
      const { password } = req.body;
      result = await UserDAO.updatePassword(req.body.id, password);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
