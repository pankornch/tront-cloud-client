import client from "@/src/configs/apollo"
import { OAUTH_MUTATION, SIGN_IN_MUTATION } from "@/src/gql"
import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
export default NextAuth({
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "email", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				try {
					const { data, errors } = await client.mutate({
						mutation: SIGN_IN_MUTATION,
						variables: {
							input: {
								email: credentials?.email,
								password: credentials?.password,
							},
						},
					})

					if (errors) return null
					const user = data.signIn.user
					user.token = data.signIn.token
					return user
				} catch (error) {
					console.error(error)
					return null
				}
			},
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	pages: {
		signIn: "/login",
		signOut: "/signout",
	},
	jwt: {
		secret: process.env.JWT_SECRET,
	},
	secret: process.env.SECRET,
	callbacks: {
		async signIn({ user, account }) {
			if (account.type === "credentials") {
				account.trontAccessToken = user.token
				// account.uid = user._id
				account.user = user
			} else {
				const { data, errors } = await client.mutate({
					mutation: OAUTH_MUTATION,
					variables: {
						input: {
							providerAccountId: account.providerAccountId,
							type: account.provider.toUpperCase(),
							email: user.email,
							avatar: user.avatar || user.image,
						},
					},
				})
				if (errors) {
					console.error(errors)
					return false
				}
				account.trontAccessToken = data.oauth.token
				account.uid = data.oauth.user._id
				account.avatar = data.oauth.user.avatar
			}
			return true
		},
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token
				token.trontAccessToken = account.trontAccessToken
				// token.uid = account.uid
				token.user = account.user
			}

			return token
		},
		async session({ session, token }) {
			if (token) {
				session.accessToken = token.accessToken
				session.trontAccessToken = token.trontAccessToken as string
				// session.user._id = token.uid as string
				// @ts-ignore
				session.user = token.user
			}

			return session
		},
	},
})
