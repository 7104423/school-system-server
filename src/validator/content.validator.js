import { ajvUtils } from "../utils/ajv.js";

const validateCreateSchema = {
  type: "object",
  properties: {
    type: {
      type: "string",
      maxLength: 200,
    },
    content: {
      type: "string",
      maxLength: 16000,
    },
    subject: {
      type: "string",
      maxLength: 200,
    },
    topic: {
      type: "string",
      maxLength: 200,
    },
  },
  required: ["type"],
};

export const validateCreate = (data) => {
  return ajvUtils.compile(validateCreateSchema)(data);
};
