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
				return {}
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
		signOut: "/auth/signout",
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log({ user, account, profile, email, credentials })
			return true
		},
	},
})
