import { ContentDAO } from "../../dao/content.dao.js";
import { SubjectDAO } from "../../dao/subject.dao.js";
import { TopicDAO } from "../../dao/topic.dao.js";

export async function DeleteAbl(req, res) {
  let result;
  try {
    const { id } = req.body;
    TopicDAO.deleteQuery({ subject: id });
    ContentDAO.deleteQuery({ subject: id });
    result = await SubjectDAO.delete(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
