import { NextPage } from "next";
import { useSession } from "next-auth/react";

const SignUp: NextPage = () => {
	const { data: session } = useSession();

	return (
		<form method="post" action="/api/auth/signup">
			<label>
				Email
				<input name="email" type="email" />
			</label>
			<label>
				Name
				<input name="name" type="name" maxLength={30} />
			</label>
			<label>
				Password
				<input name="password" type="password" />
			</label>
			<button type="submit">Sign in</button>
		</form>
	);
};

export default SignUp;
