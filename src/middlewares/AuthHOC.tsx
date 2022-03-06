import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { FC } from "react"
import { LoadingLayout } from "../components/Loading/LoadingLayout"

interface ComponentProps {
	component: React.FunctionComponent<object>
	props: React.PropsWithChildren<object>
	context: any
}

const Component: FC<ComponentProps> = ({ component, props, context }) => {
	const { status } = useSession()
	const router = useRouter()

	if (status == "loading") {
		return (
			<LoadingLayout isLoading={status === "loading"}>
				{component(props, context)}
			</LoadingLayout>
		)
	}

	if (status === "unauthenticated") {
		router.push("/login")
		return component({}, null)
	}

	return component(props, context)
}

const Auth = (component: React.FunctionComponent<object>) => {
	return (props: React.PropsWithChildren<object>, context: any) => {
		return Component({ component, props, context })
	}
}

export default Auth
