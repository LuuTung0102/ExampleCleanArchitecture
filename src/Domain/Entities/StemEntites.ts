import mongoose, {Types} from "mongoose";
import {BaseSchema} from "./BaseEntities";

const isValidObjectId = (value: Types.ObjectId) => {
    return mongoose.Types.ObjectId.isValid(value);
};

export const Stem = new mongoose.Schema({
    //createAt
    createAt: {
        type: Date,
        default: new Date()
    },

    //updateAt
    updateAt: {
        type: Date,
        default: new Date()
    },

    //isActive
    isActive: {
        type: Boolean,
        default: true
    },


    //isDelete
    isDelete: {
        type: Boolean,
        default: false
    },

    //name
    name: {
        type: String
    },

    //type
    type: {
        type: String
    },

    //description
    description: {
        type: String
    },

    //stemCode
    stemCode: {
        type: String
    },

    //qrCode
    qrCode: {
        type: String
    },

    //producer
    producer: {
        type: String
    },

    //manufacturer
    manufacturer: {
        type: String
    },

    //price
    price: {
        type: Number
    },

    //imagePath
    imagePath: {
        type: String
    },

    //youtubeUrl
    youtubeUrl: {
        type: String
    },

    //exp
    xp: {
        type: Number
    },

    //buyDate
    buyDate: {
        type: Date
    },
})


const StemWithBaseSchema = new mongoose.Schema({
    ...Stem.obj,
    ...BaseSchema.obj
})
export const StemWithBase = mongoose.model("StemWithBase", StemWithBaseSchema, "stems");