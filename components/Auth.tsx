import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface SignInProps {
	csrfToken: string;
}

export interface credentials {
	email: string;
	password: string;
}

export function SignIn(props: SignInProps) {
	const { data: session } = useSession();
	const router = useRouter();
	const { error } = router.query;

	if (!session) {
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
				{error && <p>Error</p>}
			</form>
		);
	} else {
		router.push("/").then(() => {
			router.reload();
		});
	}
}
