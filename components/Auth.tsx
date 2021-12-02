import { useSession } from "next-auth/react";
import Router from "next/router";
import { FormEvent } from "react";

interface SignInProps {
	csrfToken: string;
}

export interface credentials {
	email: string;
	password: string;
}

export function SignIn(props: SignInProps) {
	const { data: session } = useSession();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const credentials = {
			csrfToken: props.csrfToken,
			email: (
				event.currentTarget.elements.namedItem(
					"email"
				) as HTMLInputElement
			).value,
			password: (
				event.currentTarget.elements.namedItem(
					"password"
				) as HTMLInputElement
			).value,
		};
		fetch("/api/auth/callback/credentials/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(credentials),
		})
			.then((response) => response.json())
			.then((user) => {
				console.log(user);
				// if (user) {
				// 	Router.push("/");
				// }
			});
	};

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
