import mongoose, { mongo } from "mongoose";
import {BaseSchema} from "./BaseEntities";

export const Category = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'users'
    },
    stems: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stem'
    }],
})


const CategoryWithBaseSchema = new mongoose.Schema({
    ...BaseSchema.obj,
    ...Category.obj
})

export const CategoryWithBase = mongoose.model("CategoryWithBaseSchema", CategoryWithBaseSchema, "categories");