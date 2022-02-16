import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { getSession } from "next-auth/react"

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
})

const authLink = setContext(async (_, { headers }) => {
	// get the authentication token from session if it exists
	const session: any = await getSession()
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: session?.trontAccessToken
				? `Bearer ${session.trontAccessToken}`
				: "",
		},
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink)!,
	cache: new InMemoryCache({ addTypename: false }),
})

export default client
