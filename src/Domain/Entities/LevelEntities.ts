import mongoose from 'mongoose';
import { BaseSchema } from './BaseEntities';

//này done rùi
export const Level = new mongoose.Schema({
    level: {
        type: Number,
    },
    xp: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
    },
    iconPath: {
        type: String,
    }
})

const LevelWithBaseSchema = new mongoose.Schema({
    ...Level.obj,
    ...BaseSchema.obj
})

export const LevelWithBase = mongoose.model("LevelWithBase", LevelWithBaseSchema, "levels")