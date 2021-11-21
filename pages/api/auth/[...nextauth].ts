import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as dbConfig from "../../../dbconfig.json";

const options = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "Email",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				if (dbConfig.development) {
					const user = {
						name: "Test",
						email: credentials.email,
					};

					if (
						credentials.email == "test@example.com" &&
						credentials.password == "password"
					) {
						return user;
					}
					return null;
				}
				return null;
			},
		}),
	],
	secret: dbConfig.secret,
};

export default (req: NextApiRequest, res: NextApiResponse<any>) =>
	NextAuth(req, res, options);
