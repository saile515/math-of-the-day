import { useSession, signIn, signOut } from "next-auth/react";

export function Profile() {
	const { data: session } = useSession();

	if (session) {
		console.log(session);
		return (
			<div>
				<p>{session.user.name}</p>
				<button onClick={() => signOut()}>Sign Out</button>
			</div>
		);
	}

	return (
		<div>
			<button onClick={() => signIn("Credentials")}>Sign in</button>
		</div>
	);
}
