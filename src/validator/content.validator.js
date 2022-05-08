//import { ajvUtils } from "../utils/ajv.js";
import Ajv from "ajv";
const ajvUtils = new Ajv();

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

const validateUpdateSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
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
  required: ["id", "type"],
};

export const validateCreate = (data) => {
  return ajvUtils.compile(validateCreateSchema)(data);
};

export const validateUpdate = (data) => {
  return ajvUtils.compile(validateUpdateSchema)(data);
};
