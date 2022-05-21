import { SubjectDAO } from "../../dao/subject.dao.js";
import { validateUpdate } from "../../validator/subject.validator.js";

export async function UpdateAbl(req, res) {
  let result;
  try {
    if (!validateUpdate(req.body)) {
      throw new Error("Validation failed");
    }
    result = await SubjectDAO.update(req.body.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
