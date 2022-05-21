import { ajvUtils } from "../utils/ajv.js";

const validateCreateSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
    goal: {
      type: "string",
      minLength: 0,
      maxLength: 4000,
    },
    credits: {
      type: "number",
      minimum: 1,
      maximum: 30,
    },
    supervisor: {
      type: "string",
    },
    teachers: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "string",
      },
    },
    language: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
    studyProgramme: {
      type: "string",
    },
  },
  required: ["name", "supervisor", "teachers", "studyProgramme"],
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
    goal: {
      type: "string",
      minLength: 1,
      maxLength: 4000,
    },
    credits: {
      type: "number",
      minimum: 0,
      maximum: 30,
    },
    supervisor: {
      type: "string",
    },
    teachers: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "string",
      },
    },
    language: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
    studyProgramme: {
      type: "string",
    },
  },
  required: ["id", "name", "supervisor", "teachers", "studyProgramme"],
};

export const validateCreate = (data) => {
  return ajvUtils.compile(validateCreateSchema)(data);
};

export const validateUpdate = (data) => {
  return ajvUtils.compile(validateUpdateSchema)(data);
};
