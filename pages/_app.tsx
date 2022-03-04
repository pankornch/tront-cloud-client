import "../styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import { ApolloProvider } from "@apollo/client"
import client from "@/src/configs/apollo"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<ApolloProvider client={client}>
				<Head>
					<title>Tront</title>
					<meta name="description" content="Tront free restful api" />
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<link rel="manifest" href="/site.webmanifest" />
				</Head>
				<Component {...pageProps} />
				<div id="portal"></div>
			</ApolloProvider>
		</SessionProvider>
	)
}

export default MyApp
