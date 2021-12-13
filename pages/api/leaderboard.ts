import { connect } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../backend/database/register";

connect(process.env.DATABASE_URL);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const users = await User.find({})
		.sort({ score: -1 })
		.limit(100)
		.then((data: any) => {
			const users: {
				name: string;
				score: number;
				index: number;
			}[] = [];

			for (let i = 0; i < data.length; i++) {
				users.push({
					name: data[i].name,
					score: data[i].score,
					index: i + 1,
				});
			}

			res.send(JSON.stringify(users));
		});
}
