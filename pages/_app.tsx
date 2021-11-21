import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}
