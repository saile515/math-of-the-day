import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../styles/profile.module.scss";
import { Stats } from "../components/Stats";

export function Profile() {
	const { data: session } = useSession();

	if (session) {
		return (
			<div className={styles.profileContainer}>
				<Stats session={session} />
				<button
					onClick={() => signOut()}
					className={styles.signOutButton}
				>
					Sign Out
				</button>
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
