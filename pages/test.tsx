import React from "react"
import Lottie from "lottie-react"
import Loading from "@/public/loading.json"
import ReactDOM from "react-dom"
import LoadingOverLay from "@/src/components/Loading/LoadingOverlay"
const h = () => {
	const div = document.createElement("div")
	div.id = "test"

	document.body.appendChild(div)

	ReactDOM.render(
		React.createElement(
			Lottie,
			{ animationData: Loading, loop: true, className: "w-32 h-32" },
			null
		),
		document.getElementById("test")
	)

	return () => {
		console.log("ok")
		document.body.removeChild(div)
	}
}

const Test = () => {
	return (
		<div>
			<div>Test</div>
			<button
				onClick={() => {
					const x = LoadingOverLay()
					// const x = h()
					setTimeout(x, 1000)

				}}
			>
				click
			</button>
		</div>
	)
}

export default Test
