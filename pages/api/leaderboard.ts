import { NextApiRequest, NextApiResponse } from "next";
import { credentials, User } from "../../backend/database/signup";

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

			return users;
		});
	res.send(JSON.stringify(users));
}
