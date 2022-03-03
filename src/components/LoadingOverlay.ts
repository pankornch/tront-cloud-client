export default function LoadingOverLay() {
	const container = document.createElement("div")

	container.className =
		"fixed top-0 left-0 h-screen w-screen bg-black/10 z-[999] flex justify-center items-center"

	container.innerHTML = `
        <svg class="w-24 h-24 text-main-blue animate-spin" viewBox="0 0 46 46" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M46 23C46 10.3 35.7 0 23 0C10.3 0 0 10.3 0 23H46ZM3.9 23C3.9 12.5 12.4 3.9 23 3.9C33.6 3.9 42.1 12.5 42.1 23" fill="currentColor"/>
        </svg>


    `
	document.body.appendChild(container)
	return () => {
		document.body.removeChild(container)
	}
}
