import Navbar from "@/src/components/Navbar"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const Index: NextPage = () => {
	const router = useRouter()

	const getStatus = (status: boolean) => {
		return status ? (
			<div className="bg-main-green text-white rounded-full text-xs px-2 py-1">
				On
			</div>
		) : (
			<div className="bg-gray-300 text-black rounded-full text-xs px-2 py-1">
				Off
			</div>
		)
	}
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
									<div className="text-main-green text-lg">
										{getStatus(i % 2 === 0)}
									</div>
								</div>
								<div className="text-sm my-3 flex">
									<span className="font-bold mr-2">REST:</span>
									<input
										type="text"
										defaultValue="http://tront.com/app/lorem-ipsum-dolor/rest"
										className="px-2 w-full"
										readOnly
									/>
								</div>
								<span className="text-xs">2021-03-24</span>
								<div className="flex space-x-3">
									<button
										onClick={() => router.push(`/apps/todo_app/console`)}
										className="bg-main-blue text-white px-3 py-1 rounded-md w-fit mt-3"
									>
										Open App
									</button>
									<button
										onClick={() => router.push(`/apps/todo_app/data`)}
										className="bg-main-green text-white px-3 py-1 rounded-md w-fit mt-3"
									>
										Data
									</button>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default Index
