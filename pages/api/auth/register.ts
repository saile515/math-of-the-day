import { NextApiRequest, NextApiResponse } from "next";
import { createAccount } from "../../../backend/database/register";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (await createAccount(req.body)) {
		res.redirect("/login");
	} else {
		res.redirect("/register?error=userExists");
	}
}
