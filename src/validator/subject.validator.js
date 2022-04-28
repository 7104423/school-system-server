import { ajvUtils  } from "../utils/ajv.js";

const validateCreateSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 1,
            maxLength: 255
        },
        goal: {
            type: "string",
            minLength: 1,
            maxLength: 4000
        },
        supervisor: {
            type: "string"
        },
        teachers: {
            type: "array",
            uniqueItems: true,
            items: {
                type: "string"
            }
        },
        students: {
            type: "array",
            uniqueItems: true,
            items: {
                type: "string"
            }
        },
        degree: {
            type: "string",
            minLength: 1,
            maxLength: 255
        },
        language: {
            type: "string",
            minLength: 1,
            maxLength: 255
        },
        studyProgramme: {
            type: "string"
        }
    },
    reguired: ["name", "supervisor", "teachers", "students", "studyProgramme"]
};

export const validateCreate = (data) => {
    return ajvUtils.compile(validateCreateSchema)(data);
};
