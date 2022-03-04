import React, { FC } from "react"
import LogoSVG from "@/public/logo.svg"
import Image from "next/image"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"
import { ChevronDownIcon, LogoutIcon } from "@heroicons/react/solid"

const Navbar: FC = () => {
	const router = useRouter()
	const { data } = useSession()
	const handleSignout = () => {
		signOut()
	}


	return (
		<nav className="container py-5 shadow-md bg-white fixed top-0 right-0 w-screen flex justify-between items-center z-50">
			<div className="cursor-pointer" onClick={() => router.push("/apps")}>
				<LogoSVG className="h-10" />
			</div>

			<details className="relative group">
				<summary
					className="flex cursor-pointer items-center space-x-3 px-4 py-2 rounded-md transition-all before:hidden group-open:before:block before:contents-[' '] before:cursor-default before:h-screen before:w-screen before:fixed before:top-0 before:right-0"
				>
					<Image
						src={data?.user?.avatar || "/logo.svg"}
						loader={({ src }) => src}
						width={24}
						height={24}
						alt=""
						unoptimized
					/>
					<span className="hidden sm:block group-open:block truncate max-w-[32rem]">
						{data?.user?.email}
					</span>
					<ChevronDownIcon className="w-6" />
				</summary>

				<div className="absolute right-0 -bottom-14 bg-white w-48 rounded-md shadow-md border-2 border-gray-200 overflow-hidden">
					<button
						onClick={handleSignout}
						type="button"
						className="flex items-center gap-x-3 px-4 py-2 text-sm text-main-red hover:bg-main-blue-light w-full text-left"
					>
						<LogoutIcon className="w-6" />
						<span>Sign Out</span>
					</button>
				</div>
			</details>
		</nav>
	)
}

export default Navbar
