import mongoose, { Types } from "mongoose";
import speakeasy from "speakeasy";
import { BaseSchema } from "./BaseEntities";

// check ObjectId is valid or not 
const isValidObjectId = (value: Types.ObjectId) => {
    return mongoose.Types.ObjectId.isValid(value);
};

export const History = new mongoose.Schema({
  userId: {
    type: Types.ObjectId,
    validate: {
      validator: isValidObjectId,
    }
  },
  stemId: {
    type: Types.ObjectId,
    validate: {
      validator: isValidObjectId,
    }
  },
  stemName: {
    type: String,
  },
  xp_gain_amount: {
    type: Number,
  },
  xp_gain_date: {
    type: Date,
    default: Date.now
  },
  stemImagePath: {
    type: String,
  },
});

const HistoryWithBaseSchema = new mongoose.Schema({
  ...History.obj,
  ...BaseSchema.obj
});

// Tạo model cho entity History
export const HistoryWithBase = mongoose.model("HistoryWithBase", HistoryWithBaseSchema, "history");