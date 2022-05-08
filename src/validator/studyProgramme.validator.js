//import { ajvUtils } from "../utils/ajv.js";
import Ajv from "ajv";
const ajvUtils = new Ajv();

const validateCreateSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
    description: {
      type: "string",
      minLength: 1,
      maxLength: 4000,
    },
    supervisor: {
      type: "string",
    },
  },
  required: ["name", "supervisor"],
};

const validateUpdateSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
    description: {
      type: "string",
      minLength: 1,
      maxLength: 4000,
    },
    supervisor: {
      type: "string",
    },
  },
  required: ["id", "name", "supervisor"],
};

export const validateCreate = (data) => {
  return ajvUtils.compile(validateCreateSchema)(data);
};

export const validateUpdate = (data) => {
  return ajvUtils.compile(validateUpdateSchema)(data);
};
