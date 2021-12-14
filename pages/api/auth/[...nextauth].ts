import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import { User } from "../../../backend/database/register";
import { connect } from "mongoose";
import {
	Session,
	SessionStrategy,
	User as UserType,
} from "next-auth/core/types";

connect(process.env.DATABASE_URL);

const options = {
	callbacks: {
		async session({ session, token, user }: any) {
			session.user = token.user;
			return session;
		},
		async jwt({ token, user }: any) {
			if (user) {
				token.user = user;
				token.user.id = user.id;
			}
			return token;
		},
	},
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
						let user = data;
						if (data != null) {
							user = {
								email: data.email,
								name: data.name,
								id: data._id,
							};
						}
						resolve(user);
					});
				});
				return promise;
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	secret: process.env.SECRET,
	jwt: {
		secret: process.env.SECRET,
	},
	session: {
		strategy: "jwt" as SessionStrategy,
		maxAge: 30 * 24 * 60 * 60,
	},
};

export default (req: NextApiRequest, res: NextApiResponse<any>) =>
	NextAuth(req, res, options);
