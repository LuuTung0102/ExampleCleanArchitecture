import mongoose, { Types } from 'mongoose';
import { BaseSchema } from './BaseEntities';

const isValidObjectId = (value: Types.ObjectId) => {
	return mongoose.Types.ObjectId.isValid(value);
};

export const User = new mongoose.Schema({
	fullname: String,
	password: String,
	imagePath: String,
	total_xp: Number,
	current_level_xp: Number,
	xp_require_level_up: Number,
	level_id: {
		type: Types.ObjectId,
		validate: {
			validator: isValidObjectId,
		},
	},
	current_level: Number,
	next_level: Number,
	total_system_own: Number,
	total_money_spent: Number,
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

const UserWithBaseSchema = new mongoose.Schema({
	...User.obj,
	...BaseSchema.obj,
});

export const UserWithBaseV2 = mongoose.model('UserWithBaseV2', UserWithBaseSchema, 'users');
