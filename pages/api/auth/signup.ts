import { NextApiRequest, NextApiResponse } from "next";
import { createAccount } from "../../../backend/database/signup";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		createAccount(req.body);
	} catch (err) {
		throw err;
	}
	res.redirect("/auth");
}
