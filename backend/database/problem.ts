import { Schema, model, Model } from "mongoose";

export interface problemData {
	difficulty: string;
	title: string;
	problem: string;
	answer: string;
	image: string;
	date: Date;
}

export const problemSchema = new Schema<problemData>({
	difficulty: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	problem: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});

export let Problem: Model<problemData>;

try {
	Problem = model("Problem");
} catch (err) {
	Problem = model("Problem", problemSchema);
}

export function createProblem(data: problemData) {
	const problem = new Problem(data);
	problem.save(function (err: Error) {
		if (err) throw err;
	});
}
