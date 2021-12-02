import {
	GetServerSideProps,
	NextPage,
	InferGetServerSidePropsType,
} from "next";
import { SignIn } from "../components/Auth";
import { getCsrfToken } from "next-auth/react";

const Auth: NextPage = ({
	csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return <SignIn csrfToken={csrfToken} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return { props: { csrfToken: await getCsrfToken(context) } };
};

export default Auth;
