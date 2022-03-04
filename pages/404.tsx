import React from "react"
import Lottie from "lottie-react"
import NotFoundLottie from "@/public/404.json"
import Link from "next/link"

const NotFound = () => {
	return (
		<div className="h-screen w-screen overflow-hidden relative select-none bg-main-blue-light lg:bg-white">
			<Lottie animationData={NotFoundLottie} className="w-full hidden lg:block" loop />

			<div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-40 flex flex-col items-center">
				<div className="text-[8rem] lg:text-[12rem] leading-none animate-bounce-slow text-main-blue">404</div>
				<div className="text-3xl lg:text-5xl font-semibold leading-none">Page Not Found</div>
				<div className="text-center text-white lg:text-main-blue-light mt-3">We&apos;re sorry, the page you requested could not be found</div>
				<div className="text-center text-white lg:text-main-blue-light">go back to homepage</div>
				<Link href="/">
					<a className="bg-main-blue text-white text-xl rounded-full px-8 py-2 mt-6">
						GO HOME
					</a>
				</Link>
			</div>
		</div>
	)
}

export default NotFound
