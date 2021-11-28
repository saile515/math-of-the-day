import { Schema, model, Model, models } from "mongoose";

export interface problemData {
	difficulty: string;
	title: string;
	problem: string;
	image: string;
	date: Date;
}

export const problemSchema = new Schema<problemData>({
	difficulty: String,
	title: String,
	problem: String,
	image: String,
	date: Date,
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
