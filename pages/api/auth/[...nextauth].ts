import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const options = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "jsmith",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const user = {
					id: 1,
					name: "J Smith",
					email: "jsmith@example.com",
				};

				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
		// ...add more providers here
	],
};

export default (req: NextApiRequest, res: NextApiResponse<any>) =>
	NextAuth(req, res, options);
