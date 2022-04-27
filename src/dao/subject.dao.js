import mongoose from "mongoose";
import { SubjectModel } from "../model/subject.model.js";

function parseToPlainObject(obj) {
    return {
        id: obj._id,
        name: obj.name,
        goal: obj.goal,
        supervisor: obj.supervisor,
        teachers: obj.teachers,
        students: obj.students,
        degree: obj.degree,
        language: obj.language,
        studyProgramme: obj.studyProgramme
    };
}

export class SubjectDAO {
    constructor({id, _id = "", name, goal, supervisor, teachers, students, degree, language, studyProgramme}) {
        this.id = id || _id || "";
        this.name = name || "";
        this.goal = goal || "";
        this.supervisor = supervisor || "";
        this.teachers = teachers || [];
        this.students = students || [];
        this.degree = degree || "";
        this.language = language || "";
        this.studyProgramme = studyProgramme || "";
    }

    /**
     * create subject
     */
    static async create(data) {
        let subject = {
            name: data.name,
            goal: data.goal,
            supervisor: data.supervisor,
            teachers: data.teachers,
            students: data.students,
            degree: data.degree,
            language: data.language,
            studyProgramme: data.studyProgramme
        }
        const result = await SubjectModel.create(subject);
        return new this(parseToPlainObject(result));
    }

    /**
     * get subject
     */
    static async get(id) {
        const result = await SubjectModel.findById(id);        
        if (!result) {
            return null;
        }
        return new this(parseToPlainObject(result));
    }

    /**
     * list all subjects
     */
    static async list() {
        const array = await SubjectModel.find();
        if (!array) {
            return null;
        }
        const result = array.map((obj) =>  new this(parseToPlainObject(obj)));
        return result;
    }

    /**
     * update subject
     */
    static async update(id, data) {
        let subject = {
            name: data.name,
            goal: data.goal,
            supervisor: data.supervisor,
            teachers: data.teachers,
            students: data.students,
            degree: data.degree,
            language: data.language,
            studyProgramme: data.studyProgramme           
        }
        const result = await SubjectModel.findByIdAndUpdate(id, subject, {returnDocument: "after"});
        return new this(parseToPlainObject(result));
    }

    /**
     * delete subject
     */
    static async delete(id) {
        const result = await SubjectModel.findByIdAndDelete(id);
        return new this(parseToPlainObject(result));
    }
}
