import { connect } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { credentials, User } from "../../../backend/database/register";

connect(process.env.DATABASE_URL);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return new Promise((resolve, reject) =>
		User.findOne({
			_id: req.query.user[0],
		}).exec(function (err: Error, data: credentials) {
			if (err) {
				throw err;
			}

			let user = null;

			if (data) {
				user = {
					email: data.email,
					name: data.name,
					score: data.score,
					solved: data.solved,
				};
			}
			res.send(JSON.stringify(user));
			resolve(200);
		})
	);
}
