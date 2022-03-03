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
						<meta name="description" content="Tront free restful api" />
						<link rel="icon" href="/logo.svg" />
					</Head>
					<Component {...pageProps} />
					<div id="portal"></div>
				</RecoilRoot>
			</ApolloProvider>
		</SessionProvider>
	)
}

export default MyApp
