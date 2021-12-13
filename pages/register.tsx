import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/auth.module.scss";
import { ValidateEmail } from "../backend/validate";

const SignUp: NextPage = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const { error } = router.query;
	const [passwordType, setPasswordType] = useState<string>("password");
	const [eye, setEye] = useState(styles.eyeOpen);
	let errorString: string;
	if (error) {
		switch (error) {
			case "userExists":
				errorString = "A user with this email already exists.";
				break;
			case "invalidEmail":
				errorString = "Please insert a valid email.";
				break;
		}
	}
	const errorElement = <p className={styles.error}>{errorString}</p>;

	function togglePassword() {
		setPasswordType(passwordType == "password" ? "text" : "password");
		setEye(eye == styles.eyeOpen ? styles.eyeClosed : styles.eyeOpen);
	}

	return (
		<div className={styles.page}>
			<form
				className={styles.container}
				method="post"
				action="/api/auth/register"
				onSubmit={(event) => {
					if (
						ValidateEmail(
							(
								document.getElementById(
									"email"
								) as HTMLInputElement
							).value
						)
					) {
						return;
					}
					const url = new URL(document.location.toString());
					url.searchParams.set("error", "invalidEmail");
					document.location = url.toString();
					event.preventDefault();
				}}
			>
				<label className={styles.label}>Email</label>
				<input
					className={styles.input}
					name="email"
					type="email"
					id="email"
				/>
				<label className={styles.label}>Name</label>
				<input
					className={styles.input}
					name="name"
					type="name"
					maxLength={30}
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
				<button type="submit" className={styles.button}>
					Register
				</button>
				{errorElement}
				<p className={styles.alert}>
					Already have an account?{" "}
					<Link href="/login" passHref>
						<a className={styles.link}>Login</a>
					</Link>{" "}
					instead.
				</p>
			</form>
		</div>
	);
};

export default SignUp;
