import { NextApiRequest, NextApiResponse } from "next";
import { createAccount } from "../../../backend/database/signup";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	createAccount(req.body);
	res.end("true");
}
