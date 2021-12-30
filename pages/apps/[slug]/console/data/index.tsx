import Navbar from "@/src/components/Navbar"
import { NextPage } from "next"
import React from "react"
import { MOCK_BOOKS_DATA } from "@/src/mock"
import Input from "@/src/components/Input"
import Select from "@/src/components/Select"

const Index: NextPage = () => {
	return (
		<div>
			<Navbar />

			<div className="container mt-20 py-12 space-y-12">
				<h1 className="text-center text-2xl font-bold">
					API:
					<span className="underline underline-offset-4 text-main-blue cursor-pointer ml-2">
						Books
					</span>
				</h1>

				<div className="flex lg:flex-row flex-col lg:items-center items-start">
					<div className="lg:w-128 w-full lg:mr-12 lg:mb-0 mb-6">
						<Input placeholder="Search EX. firstName='John' and lastName='Doe'" />
					</div>
					<div className="flex space-x-3 overflow-x-auto w-full lg:w-auto">
						<div className="bg-main-blue text-white px-3 py-2 rounded-lg h-fit">
							Export Query
						</div>
						<div className="bg-main-blue text-white px-3 py-2 rounded-lg h-fit">
							Insert
						</div>
						<div className="bg-main-blue text-white px-3 py-2 rounded-lg h-fit">
							Update
						</div>
						<div className="bg-main-blue text-white px-3 py-2 rounded-lg h-fit">
							Delete
						</div>
						<div className="bg-main-blue text-white px-3 py-2 rounded-lg h-fit">
							Mock
						</div>
					</div>
				</div>

				<div className="flex items-end">
					<Select
						label="Limit"
						options={[10, 50, 100]}
						className="w-40 mr-12"
					/>
					<div className="flex mb-2 space-x-3">
						<div className="bg-main-blue px-3 py-1 text-sm text-white rounded-md">
							Pevious
						</div>
						<div>1</div>
						<div className="bg-main-blue px-3 py-1 text-sm text-white rounded-md">
							Next
						</div>
					</div>
				</div>
				<pre className="h-[calc(100vh-100px)] overflow-y-auto p-6 border-2 border-gray-300 rounded-lg shadow-md">
					{JSON.stringify(MOCK_BOOKS_DATA, null, 2)}
				</pre>
			</div>
		</div>
	)
}

export default Index
