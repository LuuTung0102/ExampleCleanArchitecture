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
      ref: 'User', default: () => new mongoose.Types.ObjectId()
    }
  },
  stemId: {
    type: Types.ObjectId,
    validate: {
      validator: isValidObjectId,
      ref: 'Stem', default: () => new mongoose.Types.ObjectId()
    }
  },
  stemName: {
    type: String,
    default: 'default'
  },
  xp_gain_amount: {
    type: Number,
    default: 0
  },
  xp_gain_date: {
    type: Date,
    default: Date.now
  },
  stemImagePath: {
    type: String,
    default: 'default/path/to/image.jpg'
  },
});

const HistoryWithBaseSchema = new mongoose.Schema({
  ...History.obj,
  ...BaseSchema.obj
});

// Tạo model cho entity History
export const HistoryWithBase = mongoose.model("HistoryWithBase", HistoryWithBaseSchema, "history");