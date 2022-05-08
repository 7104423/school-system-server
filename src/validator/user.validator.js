/**
 * Read https://ajv.js.org/guide/getting-started.html for
 * schema generation
 */
import { ajvUtils } from "../utils/ajv";

const validateCreateSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    groups: {
      type: "string",
    },
  },
  required: ["id", "email", "password"],
};

const validateUpdateSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    groups: {
      type: "string",
    },
  },
  required: ["id", "email", "password"],
};

/**
 * @param {any} data
 * @returns {boolean}
 */
export const validateCreate = (data) => {
  return ajvUtils.compile(validateCreateSchema)(data);
};

/**
 * @param {any} data
 * @returns {boolean}
 */
 export const validateUpdate = (data) => {
  return ajvUtils.compile(validateUpdateSchema)(data);
};
