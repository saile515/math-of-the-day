import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import { User } from "../../../backend/database/signup";
import { connect } from "mongoose";
import { signIn } from "next-auth/react";

const options = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "Email",
				},
				name: {
					label: "Name",
					type: "name",
					placeholder: "Name",
				},
				password: { label: "Password", type: "password" },
			},
			id: "credentials",
			async authorize(credentials, req) {
				await connect(process.env.DATABASE_URL);
				let hash = crypto
					.createHash("sha256")
					.update(credentials.password)
					.digest("hex");
				const promise = await new Promise((resolve, reject) => {
					User.findOne({
						email: credentials.email,
						password: hash,
					}).exec(function (err: Error, data: any) {
						if (err) {
							throw err;
						}
						resolve(data);
					});
				});
				console.log(promise);
				return promise;
			},
		}),
	],
	pages: {
		signIn: "/auth",
	},
	jwt: {
		secret: process.env.SECRET,
	},
};

export default (req: NextApiRequest, res: NextApiResponse<any>) =>
	NextAuth(req, res, options);
