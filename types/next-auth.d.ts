import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			name: string;
			email: string;
		};
		expires: Date;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: {
			id: string;
			name: string;
			email: string;
		};
	}
}
