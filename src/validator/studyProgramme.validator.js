import { ajvUtils  } from "../utils/ajv.js";

const validateCreateSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 1,
            maxLength: 255
        },
        description: {
            type: "string",
            minLength: 1,
            maxLength: 4000
        },
        supervisor: {
            type: "string"
        }
    },
    reguired: ["name", "supervisor"]
};

export const validateCreate = (data) => {
    return ajvUtils.compile(validateCreateSchema)(data);
};
