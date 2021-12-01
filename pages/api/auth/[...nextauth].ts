import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import packageInfo from "../../../dbconfig.json";
import clientPromise from "../../../lib/mongodb";

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
				password: { label: "Password", type: "password" },
			},
			id: "credentials",
			async authorize(credentials, req) {
				console.log("Auth");
				if (packageInfo.development) {
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
				}
				return null;
			},
		}),
	],
	pages: {
		signIn: "/auth",
		signOut: "/auth",
	},
	jwt: {
		secret: packageInfo.secret,
	},
};

export default (req: NextApiRequest, res: NextApiResponse<any>) =>
	NextAuth(req, res, options);
