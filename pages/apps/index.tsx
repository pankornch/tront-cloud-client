import Navbar from "@/src/components/Navbar"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const Index: NextPage = () => {
	const router = useRouter()
	return (
		<div>
			<Navbar />

			{/* Content */}
			<div className="container mt-20 py-12">
				{/* nav */}
				<div className="flex justify-between items-center">
					<div className="text-xl">Apps</div>
					<Link href="/apps/create">
						<a className="bg-main-blue text-white px-3 py-2 cursor-pointer rounded-lg">
							Create App
						</a>
					</Link>
				</div>

				{/* apps */}

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
					{Array(10)
						.fill(0)
						.map((_, i) => (
							<div
								key={i}
								className="shadow-lg rounded-lg px-6 py-4 border border-gray-100 hover:border-main-blue-light"
							>
								<div className="flex justify-between items-center">
									<div className="text-lg font-bold">Lorem ipsum dolor</div>
									<div className="text-main-green text-lg">Active</div>
								</div>
								<div className="text-sm my-3 flex">
									<span className="font-bold mr-2">REST:</span>
									<input
										type="text"
										defaultValue="http://tront.com/app/lorem-ipsum-dolor/rest"
										className="px-2 w-full"
									/>
								</div>
								<div className="text-xs">2021-03-24</div>
								<button onClick={() => router.push(`/apps/${i}/console`)} className="bg-main-blue text-white px-3 py-1 rounded-lg w-fit mt-3">
									Open App
								</button>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default Index
