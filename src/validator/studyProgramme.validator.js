import { ajvUtils } from "../utils/ajv.js";

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
    students: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "string"
      }
    },
    degree: {
      type: "string"
    }
  },
  required: ["name", "supervisor", "students", "degree"],
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
    students: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "string"
      }
    },
    degree: {
      type: "string"
    }
  },
  required: ["id", "name", "supervisor", "students", "degree"],
};

export const validateCreate = (data) => {
  return ajvUtils.compile(validateCreateSchema)(data);
};

export const validateUpdate = (data) => {
  return ajvUtils.compile(validateUpdateSchema)(data);
};
