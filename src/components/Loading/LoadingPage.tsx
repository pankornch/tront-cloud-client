import Lottie from "lottie-react"
import Loading from "@/public/loading.json"
const LoadingPage = () => {
	return (
		<div className="h-screen w-screen flex items-center justify-center">
			<Lottie animationData={Loading} className="w-56 h-56" loop />
		</div>
	)
}

export default LoadingPage
