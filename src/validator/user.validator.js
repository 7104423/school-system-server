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
    thirdPartyIdentity: {
      type: "boolean",
    },
    name: {
      type: "string",
    },
    surname: {
      type: "string",
    },
    password: {
      type: "string",
    },
    resetPassword: {
      type: "boolean",
    },
    groups: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "string"
      }
    },
  },
  required: ["email", "password"],
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
    thirdPartyIdentity: {
      type: "boolean",
    },
    name: {
      type: "string",
    },
    surname: {
      type: "string",
    },
    groups: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "string"
      }
    },
  },
  required: ["id", "email"],
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
