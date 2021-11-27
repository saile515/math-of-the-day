import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../styles/profile.module.scss";

export function Profile() {
	const { data: session } = useSession();

	if (session) {
		return (
			<div>
				<p>{session.user.name}</p>
				<button onClick={() => signOut()}>Sign Out</button>
			</div>
		);
	}

	return (
		<div className={styles.profileContainer}>
			<p className={styles.signInAlert}>
				You need to{" "}
				<button
					className={styles.signInLink}
					onClick={() => signIn("Credentials")}
				>
					Sign In
				</button>{" "}
				to see your profile.
			</p>
		</div>
	);
}
