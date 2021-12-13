import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/auth.module.scss";

const SignUp: NextPage = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const { error } = router.query;
	const [passwordType, setPasswordType] = useState<string>("password");

	function togglePassword() {
		setPasswordType(passwordType == "password" ? "text" : "password");
	}

	return (
		<div>
			<form
				className={styles.container}
				method="post"
				action="/api/auth/signup"
			>
				<label className={styles.label}>Email</label>
				<input className={styles.input} name="email" type="email" />
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
						value="👁"
						className={styles.togglePassword}
						type="button"
						onClick={() => togglePassword()}
					/>
				</div>
				<button type="submit" className={styles.button}>
					Register
				</button>
				{error && (
					<p className={styles.error}>
						A user with that email already exists.
					</p>
				)}
			</form>
		</div>
	);
};

export default SignUp;
