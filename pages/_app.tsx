import "../styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import { RecoilRoot } from "recoil"
import { ApolloProvider } from "@apollo/client"
import client from "@/src/configs/apollo"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<ApolloProvider client={client}>
				<RecoilRoot>
					<Head>
						<title>Tront</title>
						<meta name="description" content="Generated by create next app" />
						<link rel="icon" href="/logo.svg" />
					</Head>
					<Component {...pageProps} />
				</RecoilRoot>
			</ApolloProvider>
		</SessionProvider>
	)
}

export default MyApp
