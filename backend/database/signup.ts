import { Schema, model, Model, connect } from "mongoose";
import crypto from "crypto";

connect(process.env.DATABASE_URL);

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
	const exists = await User.exists({ email: credentials.email });
	return new Promise((resolve, reject) => {
		if (exists) {
			resolve(false);
		} else {
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
				resolve(true);
			});
		}
	});
}
