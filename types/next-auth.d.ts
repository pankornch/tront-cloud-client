import NextAuth from "next-auth"

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */

	interface User {
		_id: string
		email: string
		avatar: string
	}

	interface Session {
		user: User
        trontAccessToken: string
	}
	
}
