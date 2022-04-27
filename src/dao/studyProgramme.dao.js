import mongoose from "mongoose";
import { StudyProgrammeModel } from "../model/studyProgramme.model.js";

function parseToPlainObject(obj) {
    return {
        id: obj._id,
        name: obj.name,
        description: obj.description,
        supervisor: obj.supervisor
    };
}

export class StudyProgrammeDAO {
    constructor({id, _id = "", name, description, supervisor}) {
        this.id = id || _id || "";
        this.name = name || "";
        this.description = description || "";
        this.supervisor = supervisor || "";
    }

    /**
     * create study programme
     */
    static async create(data) {
        let studyProgramme = {
            name: data.name,
            description: data.description,
            supervisor: data.supervisor
        }
        const result = await StudyProgrammeModel.create(studyProgramme);
        return new this(parseToPlainObject(result));
    }

    /**
     * get study programme
     */
    static async get(id) {
        const result = await StudyProgrammeModel.findById(id);        
        if (!result) {
            return null;
        }
        return new this(parseToPlainObject(result));
    }

    /**
     * list all study programmes
     */
    static async list() {
        const array = await StudyProgrammeModel.find();
        if (!array) {
            return null;
        }
        const result = array.map((obj) =>  new this(parseToPlainObject(obj)));
        return result;
    }

    /**
     * update study programme
     */
    static async update(id, data) {
        let studyProgramme = {
            name: data.name,
            description: data.description,
            supervisor: data.supervisor            
        }
        const result = await StudyProgrammeModel.findByIdAndUpdate(id, studyProgramme, {returnDocument: "after"});
        return new this(parseToPlainObject(result));
    }

    /**
     * delete study programme
     */
    static async delete(id) {
        const result = await StudyProgrammeModel.findByIdAndDelete(id);
        return new this(parseToPlainObject(result));
    }
}
