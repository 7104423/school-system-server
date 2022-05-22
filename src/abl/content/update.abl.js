import { ContentDAO } from "../../dao/content.dao.js";
import { TopicDAO } from "../../dao/topic.dao.js";
import { validateUpdate } from "../../validator/content.validator.js";

export async function UpdateAbl(req, res) {
  let result;
  try {
    if (!validateUpdate(req.body)) {
      throw new Error("Validation failed");
    }

    const { topic, subject } = req.body;
    if (topic) {
      const topicDao = await TopicDAO.get(topic);
      if (topicDao.subject !== subject) {
        res.status(400).json({
          message: "Topic's subject is different from Digital Content subject",
        });
      }
    }

    result = await ContentDAO.update(req.body.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
