import { Schema, model, Model } from "mongoose";

interface credentials {
	email: string;
	password: string;
	name: string;
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
});

export let User: Model<credentials>;

try {
	User = model("User");
} catch (err) {
	User = model("Problem", UserSchema);
}

export function createAccount(credentials: credentials) {
	if (!User.exists({ email: credentials.email })) {
		const user = new User(credentials);
		user.save(function (err: Error) {
			if (err) throw err;
			return true;
		});
	}
	return false;
}
