import React, { FC, useEffect, useRef, useState } from "react"
import LogoSVG from "@/public/logo.svg"
import Image from "next/image"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"
import useComponentClickOutside from "../hooks/useComponentClickOutside"

const Navbar: FC = () => {
	const router = useRouter()
	const { data } = useSession()
	const handleSignout = () => {
		signOut()
	}

	const { ref, show, toggle } = useComponentClickOutside(false)


	return (
		<nav className="container py-5 shadow-md bg-white fixed top-0 right-0 w-screen flex justify-between items-center z-50">
			<div
				className="flex items-center cursor-pointer"
				onClick={() => router.push("/apps")}
			>
				<LogoSVG className="h-10" />
				<span className="font-semibold ml-2 text-xl">Tront</span>
			</div>

			<div className="relative">
				<button
					onClick={toggle}
					type="button"
					className="flex items-center space-x-3 hover:bg-gray-100 px-4 py-2 rounded-full"
				>
					<Image
						src={data?.user?.avatar || "/logo.svg"}
						loader={({ src }) => src}
						width={24}
						height={24}
						alt=""
						unoptimized
					/>
					<span>{data?.user?.email}</span>
				</button>
				<div
					ref={ref}
					className={`absolute right-0 -bottom-12 bg-white w-48 rounded-md shadow-md border-2 border-gray-200 transition-all duration-100
					 ${show ? "opacity-100" : "opacity-0"} `}
				>
					<button
						onClick={handleSignout}
						type="button"
						className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
					>
						Sign Out
					</button>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
