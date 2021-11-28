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
// 		difficulty: "Medium",
// 		title: `Problem ${i}`,
// 		problem: "Problem description goes here.",
// 		image: "https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-32/90/calculator-512.png",
// 		date: new Date(2021, 10, 25 + i),
// 	});
// }

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
