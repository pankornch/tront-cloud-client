import { NextPage } from "next"
import React, { useEffect } from "react"
import { signOut } from "next-auth/react"

const SignOut: NextPage = () => {
	useEffect(() => {
		signOut({ callbackUrl: "/" })
	}, [])

	return <div></div>
}

export default SignOut
