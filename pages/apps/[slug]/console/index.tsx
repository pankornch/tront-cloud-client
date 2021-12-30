import Checkbox from "@/src/components/Checkbox"
import Input from "@/src/components/Input"
import Navbar from "@/src/components/Navbar"
import Select from "@/src/components/Select"
import Sidebar, { SidebarButton } from "@/src/components/Sidebars/Sidebar"
import SidebarModel from "@/src/components/Sidebars/SidebarModel"
import { NextPage } from "next"
import React from "react"
import PublicSVG from "@/public/public.svg"
import PrivateSVG from "@/public/lock.svg"

const Console: NextPage = () => {
	const models = [
		{
			name: "Users",
			fields: [
				{
					name: "_id",
					type: "OBJECT_ID",
					defaultValue: "",
					is_required: true,
				},
				{
					name: "name",
					type: "STRING",
					defaultValue: "",
					is_required: true,
				},
			],
		},
		{
			name: "Books",
			fields: [
				{
					name: "_id",
					type: "OBJECT_ID",
					defaultValue: "",
					is_required: true,
				},
				{
					name: "name",
					type: "STRING",
					defaultValue: "",
					is_required: true,
				},
				{
					name: "author",
					type: "OBJECT_ID",
					defaultValue: "",
					is_required: true,
					relationship: {
						type: "BELONG_TO",
						source_field: "_id",
						target_field: "_id",
						target_model: "Books",
					},
				},
			],
		},
	]

	return (
		<div>
			<Navbar />
			{/* Content */}
			<div className="container mt-20 py-12 w-full xl:w-1/2 space-y-6">
				<div className="space-y-6">
					<Input defaultValue="Lorem ipsum dolor" label="App name" />
					<Input defaultValue="Lorem ipsum dolor" label="Description" />
				</div>

				<div>
					<div>Models</div>
					<div className="ml-3 space-y-3 mt-3">
						{models.map((e, i) => (
							<SidebarModel
								key={i}
								title={`${e.name} Model`}
								label={(open) => (
									<div className="flex space-x-3">
										<strong
											className="w-fit cursor-pointer underline underline-offset-4 text-main-blue "
											onClick={open}
										>
											{e.name}
										</strong>
										<button type="button" className="bg-main-green text-white text-xs px-2 rounded-full">Data</button>
									</div>
								)}
								model={e}
							/>
						))}
					</div>
				</div>

				<div>
					<div className="flex space-x-3">
						<div>APIs</div>
						<SidebarButton
							label={(open) => (
								<div
									onClick={open}
									className="bg-main-blue text-white px-3 py-1 rounded-full cursor-pointer text-xs"
								>
									View
								</div>
							)}
							content={
								<div className="space-y-6">
									<div>API Configures</div>
									<div>
										<Select options={["Books", "Users"]} label="Models" />
									</div>

									<div>Model Schema</div>
									<div className="ml-3 space-y-6">
										<div className="grid grid-cols-2 gap-6">
											<div>Field name</div>
											<div>Type</div>
										</div>
										<div className="grid grid-cols-2 gap-6">
											<Input defaultValue="_id" disabled />
											<Input defaultValue="Object ID" disabled />
										</div>
										<div className="grid grid-cols-2 gap-6">
											<Input defaultValue="name" disabled />
											<Input defaultValue="String" disabled />
										</div>
									</div>

									<div>API Methods</div>
									<div className="space-y-6 ml-3">
										<div className="flex items-center space-x-3">
											<div className="bg-main-green text-white rounded-full w-3 h-3"></div>
											<PublicSVG className="w-3 text-main-blue" />
											<strong className="w-20 text-main-green">GET</strong>
											<div>/books</div>
										</div>
										<div className="flex items-center space-x-3">
											<div className="bg-main-green text-white rounded-full w-3 h-3"></div>
											<PublicSVG className="w-3 text-main-blue" />
											<strong className="w-20 text-main-green">GET</strong>
											<div>/books/:id</div>
										</div>
										<div className="flex items-center space-x-3">
											<div className="bg-main-green text-white rounded-full w-3 h-3"></div>
											<PrivateSVG className="w-3 text-red-500" />
											<strong className="w-20 text-yellow-500">PATCH</strong>
											<div>/books/:id</div>
										</div>
										<div className="flex items-center space-x-3">
											<div className="bg-main-green text-white rounded-full w-3 h-3"></div>
											<PrivateSVG className="w-3 text-red-500" />
											<strong className="w-20 text-orange-500">PUT</strong>
											<div>/books/:id</div>
										</div>
										<div className="flex items-center space-x-3">
											<div className="bg-gray-400 text-white rounded-full w-3 h-3"></div>
											<PrivateSVG className="w-3 text-gray-400" />
											<strong className="w-20 text-gray-400">DELETE</strong>
											<div className="text-gray-400">/books/:id</div>
										</div>
									</div>

									<Input
										label="Access token"
										defaultValue="8f1ecb56c1a076125043bb17eb37da2d"
										type="password"
									/>
								</div>
							}
						/>
					</div>
					<div className="space-x-3 ml-3 flex mt-3">
						<Checkbox label="REST:" checked={true} />
						<input
							defaultValue="https://tront.com/apps/lorem-ipsum-dolor/api/rest"
							className="w-full px-3"
						/>
					</div>
				</div>

				<div>
					<Input
						defaultValue="8f1ecb56c1a076125043bb17eb37da2d"
						label="Access Token"
						type="password"
						disabled
					/>
				</div>

				<button
					type="submit"
					className="bg-main-blue w-full py-2 text-white rounded-lg"
				>
					Edit App
				</button>
			</div>
		</div>
	)
}

export default Console
