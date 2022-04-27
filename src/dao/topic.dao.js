import mongoose from "mongoose";
import { TopicModel } from "../model/topic.model.js";

function parseToPlainObject(obj) {
    return {
        id: obj._id,
        name: obj.name,
        description: obj.description,
        icon: obj.icon,
        subject: obj.subject
    };
}

export class TopicDAO {
    constructor({id, _id = "", name, description, icon, subject}) {
        this.id = id || _id || "";
        this.name = name || "";
        this.description = description || "";
        this.icon = icon || "";
        this.subject = subject || "";
    }

    /**
     * create topic
     */
    static async create(data) {
        let topic = {
            name: data.name,
            description: data.description,
            icon: data.icon,
            subject: data.subject
        }
        const result = await TopicModel.create(topic);
        return new this(parseToPlainObject(result));
    }

    /**
     * get topic
     */
    static async get(id) {
        const result = await TopicModel.findById(id);        
        if (!result) {
            return null;
        }
        return new this(parseToPlainObject(result));
    }

    /**
     * list all topics
     */
    static async list() {
        const array = await TopicModel.find();
        if (!array) {
            return null;
        }
        const result = array.map((obj) =>  new this(parseToPlainObject(obj)));
        return result;
    }

    /**
     * update topic
     */
    static async update(id, data) {
        let topic = {
            name: data.name,
            description: data.description,
            icon: data.icon,
            subject: data.subject           
        }
        const result = await TopicModel.findByIdAndUpdate(id, topic, {returnDocument: "after"});
        return new this(parseToPlainObject(result));
    }

    /**
     * delete topic
     */
    static async delete(id) {
        const result = await TopicModel.findByIdAndDelete(id);
        return new this(parseToPlainObject(result));
    }
}
