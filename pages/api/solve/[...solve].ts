import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "mongoose";
import {
	Problem,
	problemData,
	createProblem,
} from "../../../backend/database/problem";

connect(process.env.DATABASE_URL);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return new Promise((resolve, reject) =>
		Problem.findOne({
			difficulty: req.query.solve[0],
			date: new Date(
				new Date().getFullYear(),
				new Date().getMonth(),
				new Date().getDate() + 1
			),
		}).exec(function (err: Error, data: problemData) {
			if (err) {
				throw err;
			}
			res.send(JSON.stringify(data));
			resolve(200);
		})
	);
}
