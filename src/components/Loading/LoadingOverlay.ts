import React from 'react'
import ReactDOM from 'react-dom'
import Lottie from "lottie-react"
import Loading from "@/public/loading.json"

export default function LoadingOverLay() {
	const container = document.createElement("div")
	container.id = "loading-overlay"
	container.className =
		"fixed top-0 left-0 h-screen w-screen bg-black/10 z-[999] flex justify-center items-center"

	document.body.appendChild(container)

	ReactDOM.render(
		React.createElement(Lottie, {animationData: Loading, loop: true, className: "w-56 h-56"}, null),
		container
	)

	return () => {
		document.body.removeChild(container)
	}
}
