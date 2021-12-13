import { NextApiRequest, NextApiResponse } from "next";
import { createAccount } from "../../../backend/database/signup";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (await createAccount(req.body)) {
		res.redirect("/auth");
	} else {
		res.redirect("/signup?error=userExists");
	}
}
