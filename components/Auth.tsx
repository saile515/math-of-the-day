import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/auth.module.scss";

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
	const [passwordType, setPasswordType] = useState<string>("password");
	const [eye, setEye] = useState(styles.eyeOpen);

	const { error } = router.query;
	let errorString: string;
	if (error) {
		switch (error) {
			case "CredentialsSignin":
				errorString = "You have entered an invalid email or password";
				break;
		}
	}
	const errorElement = <p className={styles.error}>{errorString}</p>;

	function togglePassword() {
		setPasswordType(passwordType == "password" ? "text" : "password");
		setEye(eye == styles.eyeOpen ? styles.eyeClosed : styles.eyeOpen);
	}

	if (!session) {
		return (
			<div className={styles.page}>
				<form
					className={styles.container}
					method="post"
					action="/api/auth/callback/credentials"
				>
					<label className={styles.label}>Email</label>
					<input
						className={styles.input}
						name="email"
						type="email"
						id="email"
					/>
					<label className={styles.label}>Password</label>
					<div className={styles.passwordContainer}>
						<input
							className={styles.input}
							id="password"
							name="password"
							type={passwordType}
						/>
						<input
							className={`${styles.togglePassword} ${eye}`}
							type="button"
							onClick={() => togglePassword()}
						/>
					</div>
					<input
						type="hidden"
						name="csrfToken"
						value={props.csrfToken}
					/>
					<button type="submit" className={styles.button}>
						Log in
					</button>
					{errorElement}
					<p className={styles.alert}>
						Don&apos;t have an account?{" "}
						<Link href="/register" passHref>
							<a className={styles.link}>Register</a>
						</Link>{" "}
						instead.
					</p>
				</form>
			</div>
		);
	} else {
		router.push("/");
	}
}
