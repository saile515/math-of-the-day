import { CtxOrReq } from "next-auth/client/_utils";
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react";

interface SignInProps {
	csrfToken: string;
}

export function SignIn(props: SignInProps) {
	const { data: session } = useSession();

	return (
		<form method="post" action="/api/auth/callback/credentials">
			<input
				name="csrfToken"
				type="hidden"
				defaultValue={props.csrfToken}
			/>
			<label>
				Email
				<input name="email" type="email" />
			</label>
			<label>
				Password
				<input name="password" type="password" />
			</label>
			<button type="submit">Sign in</button>
		</form>
	);
}
