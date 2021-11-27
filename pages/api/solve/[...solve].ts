import type { NextApiRequest, NextApiResponse } from "next";

export interface problemData {
	difficulty: string;
	title: string;
	problem: string;
	image: URL;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.send({ difficulty: req.query.solve[0] });
}
