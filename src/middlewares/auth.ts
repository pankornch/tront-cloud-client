import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult,
} from "next"
import { getSession } from "next-auth/react"

type AuthHandler = (handler: Handler) => GetServerSideProps

type Handler = (
	context: GetServerSidePropsContext
) => Promise<GetServerSidePropsResult<any>>

const auth: AuthHandler = (handler) => {
	return async (context: GetServerSidePropsContext) => {
		const session = await getSession(context)
		if (!session?.trontAccessToken) {
			return {
				redirect: {
					destination: "/login",
					permanent: false,
				},
			}
		}
		return handler(context)
	}
}

export default auth
