import mongoose, { Types } from "mongoose";
import speakeasy from "speakeasy";
import { BaseSchema } from "./BaseEntities";

const isValidObjectId = (value: Types.ObjectId) => {
    return mongoose.Types.ObjectId.isValid(value);
};

export const LeaderBoard = new mongoose.Schema({
    userId:{
        type: Types.ObjectId,
        validate: {
            validator: isValidObjectId,
        }
    },
    xp:{
        type: Number,
        default: 0
    }
})

const LeaderBoardWithBaseSchema = new mongoose.Schema({
    ...LeaderBoard.obj,
    ...BaseSchema.obj
})

export const LeaderBoardWithBase = mongoose.model("LeaderBoardWithBase", LeaderBoardWithBaseSchema, "leadeboard")
  