import React from "react"
import LoadingPage from "@/src/components/Loading/LoadingPage"
import Toast from "@/src/components/Toast"


const test = () => {
	return (
		<>
			<div className="h-12"></div>
			<button onClick={() => Toast({ type: "ERROR" })}>Open</button>
		</>
	)
}

export default test
