import mongoose, { mongo } from "mongoose";
import {BaseSchema} from "./BaseEntities";

export const Category = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User'
    },
    stems: [{
        stemId: {
            type: mongoose.Types.ObjectId,
            ref: 'Stem',
            default: null
        },
        name: {
            type: String,
        },
        price: {
            type: Number,
        }
    }],
})


const CategoryWithBaseSchema = new mongoose.Schema({
    ...BaseSchema.obj,
    ...Category.obj
})

export const CategoryWithBase = mongoose.model("CategoryWithBaseSchema", CategoryWithBaseSchema, "categories");