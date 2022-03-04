interface Props {
	duration?: number
	type: "SUCCESS" | "ERROR"
	title?: string
	body?: string
}

const Toast = (props: Props) => {
	let toastContainer = document.getElementById("toast-container")
	if (!toastContainer) {
		toastContainer = document.createElement("div")
		toastContainer.id = "toast-container"
		toastContainer.className =
			"fixed top-0 right-0 space-y-3 p-4 flex flex-col w-screen sm:w-72 items-end max-h-96 overflow-y-scroll z-50"
	}

	const toast = document.createElement("div")
	const toastTitle = document.createElement("div")
	const toastBody = document.createElement("div")

	switch (props.type) {
		case "SUCCESS":
			toast.className = "border-l-4 border-main-green w-full px-4 py-2 bg-white shadow-md rounded-md"
			toastTitle.className = "text-lg text-main-green"
			break
		case "ERROR":
			toast.className = "border-l-4 border-main-red w-full px-4 py-2 bg-white shadow-md rounded-md"
			toastTitle.className = "text-lg text-main-red"
			break
		default:
			toast.className = "border-l-4 border-gray-500 w-full px-4 py-2 bg-white shadow-md rounded-md"
			toastTitle.className = "text-lg text-gray-500"
			break
	}

	toastBody.className = "text-sm text-gray-400"

	toastTitle.textContent = props?.title || props.type
	toastBody.textContent = props?.body || ""

	toast.appendChild(toastTitle).appendChild(toastBody)

	toastContainer.appendChild(toast)
	document.body.appendChild(toastContainer)

	const remove = () => {
		toastContainer?.removeChild(toast)
		const _toastContainer = document.getElementById("toast-container")

		if (!_toastContainer?.children?.length) {
			document.body.removeChild(_toastContainer!)
		}
	}

	return new Promise<void>((resolve) => {
		setTimeout(() => {
			remove()
			resolve()
		}, props?.duration || 3000)
	})

	// return () => {
	// 	remove()
	// }
}

export default Toast
