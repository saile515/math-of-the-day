import { Schema, model, Model } from "mongoose";
import crypto from "crypto";

export interface credentials {
	email?: string;
	password?: string;
	name?: string;
	score?: number;
	solved?: { date: Date; difficulty: string }[];
}

const UserSchema = new Schema<credentials>({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	score: {
		type: Number,
		required: true,
	},
	solved: {
		type: [
			{
				date: {
					type: Date,
					required: true,
				},
				difficulty: {
					type: String,
					required: true,
				},
			},
		],
		required: true,
	},
});

export let User: Model<credentials>;

try {
	User = model("User");
} catch (err) {
	User = model("User", UserSchema);
}

export async function createAccount(credentials: credentials) {
	if (!(await User.exists({ email: credentials.email }))) {
		let userCredentials = credentials;
		let hash = crypto
			.createHash("sha256")
			.update(credentials.password)
			.digest("hex");
		userCredentials.password = hash;
		userCredentials.solved = [];
		userCredentials.score = 0;
		const user = new User(userCredentials);
		user.save(function (err: Error) {
			if (err) throw err;
			return true;
		});
	}
	return false;
}
