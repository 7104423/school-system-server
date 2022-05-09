import { ajvUtils } from "../utils/ajv.js";

const validateCreateSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      maxLength: 200,
    },
    description: {
      type: "string",
      maxLength: 16000,
    },
    subject: {
      type: "string",
      maxLength: 200,
    },
  },
  required: ["name", "subject"],
};

const validateUpdateSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
      maxLength: 200,
    },
    description: {
      type: "string",
      maxLength: 16000,
    },
    subject: {
      type: "string",
      maxLength: 200,
    },
  },
  required: ["id", "name", "subject"],
};

export const validateCreate = (data) => {
  return ajvUtils.compile(validateCreateSchema)(data);
};

export const validateUpdate = (data) => {
  return ajvUtils.compile(validateUpdateSchema)(data);
};
