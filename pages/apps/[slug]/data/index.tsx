import { NextPage } from "next"
import Navbar from "@/src/components/Navbar"
import React, { useMemo, useState } from "react"
import { MOCK_APPS, MOCK_BOOKS_DATA } from "@/src/mock"
import Select from "@/src/components/Forms/Select"
import SidebarAPI from "@/src/components/Sidebars/SidebarAPI"
import Pagination from "@/src/components/Pagination"
import Table from "@/src/components/Table"

const Index: NextPage = () => {
	const [selectData, setSelectData] = useState<string>("Table")
	const [selectPageSize, setSelectPageSize] = useState<number>(10)
	const app = MOCK_APPS[0]

	const [currentPage, setCurrentPage] = useState<number>(1)

	const renderDataComponent = useMemo(() => {
		switch (selectData) {
			case "Table":
				return (
					<div className="w-full overflow-x-scroll shadow-lg rounded-lg overflow-hidden">
						<Table
							data={MOCK_BOOKS_DATA}
							keys={Object.keys(MOCK_BOOKS_DATA[0])}
						/>
					</div>
				)
			default:
				return (
					<pre className="h-[calc(100vh-100px)] overflow-y-auto p-6 border-2 border-gray-300 rounded-lg shadow-md">
						{JSON.stringify(MOCK_BOOKS_DATA, null, 2)}
					</pre>
				)
		}
	}, [selectData])

	return (
		<div>
			<Navbar />

			<div className="container mt-20 py-12 space-y-12">
				<div className="flex justify-center items-center space-x-3">
					<h1 className="text-2xl font-bold">API:</h1>
					<Select options={["Users", "Books"]} className="w-40" />
					<SidebarAPI.View
						label={
							<div className="bg-main-blue text-white  rounded-full cursor-pointer px-3 py-1">
								View
							</div>
						}
						apiConfig={app.apiConfig!}
						model={app!.modelConfigs!.models![0]}
					/>
				</div>

				<div className="flex space-x-3 items-end">
					<Select
						options={["Table", "JSON"]}
						label="Data"
						value={selectData}
						onChange={(e) => setSelectData(e.target.value)}
						className="w-40"
					/>
					<Select
						label="Limit"
						options={[10, 50, 100]}
						value={selectPageSize}
						onChange={(e) => setSelectPageSize(~~e.target.value)}
						className="w-20"
					/>
				</div>

				{renderDataComponent}

				<div className="flex justify-end">
					<Pagination
						currentPage={currentPage}
						pageSize={selectPageSize}
						totalCount={100}
						onPageChange={setCurrentPage}
					/>
				</div>
			</div>
		</div>
	)
}

export default Index
