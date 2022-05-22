import { ContentDAO } from "../../dao/content.dao.js";
import { TopicDAO } from "../../dao/topic.dao.js";
import { validateCreate } from "../../validator/content.validator.js";

export async function CreateAbl(req, res) {
  let result;
  try {
    if (!validateCreate(req.body)) {
      throw new Error("Validation failed");
    }

    const { topic, subject } = req.body;
    if (topic) {
      const topicDao = await TopicDAO.get(topic);
      if (String(topicDao.subject?._id) !== subject) {
        res.status(400).json({
          message: "Topic's subject is different from Digital Content subject",
        });
        return;
      }
    }

    result = await ContentDAO.create(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
