import { ajvUtils } from "../utils/ajv";

const validateCreateSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
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
