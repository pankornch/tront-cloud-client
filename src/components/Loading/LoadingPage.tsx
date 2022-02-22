import Lottie from "lottie-react"
import CloudLoading from "@/public/cloud-lottie-animation.json"
const LoadingPage = () => {
	return (
		<Lottie animationData={CloudLoading} className="w-screen h-screen" loop />
	)
}

export default LoadingPage
