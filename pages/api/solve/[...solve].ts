import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "mongoose";
import { url } from "../../../dbconfig.json";
import {
	Problem,
	problemData,
	createProblem,
} from "../../../backend/database/problem";

connect(url);

// for (let i = 0; i < 10; i++) {
// 	createProblem({
// 		difficulty: "Easy",
// 		title: `Problem ${i}`,
// 		problem: "Problem description goes here.",
// 		image: "https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-32/90/calculator-512.png",
// 		date: new Date(),
// 	});
// }

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return new Promise((resolve, reject) =>
		Problem.findOne({ difficulty: req.query.solve[0] }).exec(function (
			err: Error,
			data: problemData
		) {
			if (err) {
				throw err;
				return resolve(500);
			}
			res.send(JSON.stringify(data));
			resolve(200);
		})
	);
}
