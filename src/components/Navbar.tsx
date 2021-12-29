import React, { FC } from "react"
import LogoSVG from "@/public/logo.svg"
import Image from "next/image"

const Navbar: FC = () => {
	return (
		<nav className="container py-5 shadow-md bg-white fixed top-0 right-0 w-screen flex justify-between items-center z-50">
			<div className="flex items-center">
				<LogoSVG className="h-10" />
				<span className="font-bold ml-2 text-xl">Tront</span>
			</div>

			<div className="flex items-center space-x-3 hover:bg-gray-100 cursor-default px-4 py-2 rounded-full">
				<Image
					src="https://avatars.dicebear.com/api/identicon/johndoe.svg"
					loader={({ src }) => src}
					width={24}
					height={24}
					alt=""
                    unoptimized
				/>
                <span>John Doe</span>
			</div>
		</nav>
	)
}

export default Navbar
