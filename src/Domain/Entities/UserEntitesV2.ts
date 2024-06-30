import mongoose, { Types } from 'mongoose';
import { BaseSchema } from './BaseEntities';

const isValidObjectId = (value: Types.ObjectId) => {
	return mongoose.Types.ObjectId.isValid(value);
};

export const User = new mongoose.Schema({
	fullname: String,
	password: String,
	imagePath: {
		type: String,
		default: null
	},
	total_xp: {
		type: Number,
		default: 0
	},
	current_level_xp: {
		type: Number,
		default: 0
	},
	xp_require_level_up: {
		type: Number,
		default: 0
	},
	level_id: {
		type: Types.ObjectId,
		validate: {
			validator: isValidObjectId,
		},
	},
	current_level: {
		type: Number,
		default: 0
	},
	next_level: {
		type: Number,
		default: 0
	},
	total_system_own: {
		type: Number,
		default: 0
	},
	total_money_spent: {
		type: Number,
		default: 0
	},
	stemId: {
		type: Types.ObjectId,
		validate: {
			validator: isValidObjectId,
		},
		ref: 'Stem',
	},
	stemCode: [String],
	categoryId: {
		type: Types.ObjectId,
		validate: {
			validator: isValidObjectId,
		},
	}
});

const UserWithBaseSchemaV2 = new mongoose.Schema({
	...User.obj,
	...BaseSchema.obj,
});

export const UserWithBaseV2 = mongoose.model("UserWithBaseV2", UserWithBaseSchemaV2, "users");
