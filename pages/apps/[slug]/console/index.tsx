import Checkbox from "@/src/components/Checkbox"
import Input from "@/src/components/Input"
import Navbar from "@/src/components/Navbar"
import SidebarModel from "@/src/components/Sidebars/SidebarModel"
import { NextPage } from "next"
import React from "react"

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
					<div className="ml-3">
						{models.map((e, i) => (
							<SidebarModel
								key={i}
								title={`${e.name} Model`}
								label={(open) => (
									<div className="w-fit cursor-pointer" onClick={open}>
										{e.name}
									</div>
								)}
								model={e}
							/>
						))}
					</div>
				</div>

				<div>
					<div>APIs</div>
					<div className="space-x-3 ml-3 flex">
						<Checkbox label="REST:" checked={true} />
						<input
							defaultValue="https://tront.com/apps/lorem-ipsum-dolor/api/rest"
							className="w-full px-3"
						/>
					</div>
				</div>

				<div>
					<div>Public Permission</div>
					<div className="ml-3">
						<Checkbox label="Create" disabled />
						<Checkbox label="Read" disabled />
						<Checkbox label="Update" disabled />
						<Checkbox label="Delete" disabled />
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
