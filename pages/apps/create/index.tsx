import Checkbox from "@/src/components/Checkbox"
import Input from "@/src/components/Input"
import Navbar from "@/src/components/Navbar"
import Select from "@/src/components/Select"
import { SidebarButton } from "@/src/components/Sidebar"
import { useFormik } from "formik"
import { NextPage } from "next"
import React from "react"

const Index: NextPage = () => {
	const formik = useFormik({
		initialValues: {
			name: "",
			description: "",
		},
		onSubmit: () => {},
	})

	const dataTypes = [
		{ label: "String", value: "STRING" },
		{ label: "Number", value: "NUMBER" },
		{ label: "Object", value: "OBJECT" },
		{ label: "Array", value: "ARRAY" },
		{ label: "Object ID", value: "OBJECT_ID" },
	]

	const relationshipTypes = [
		{ label: "Has One", value: "HAS_ONE" },
		{ label: "Has Many", value: "HAS_MANY" },
		{ label: "Belong To", value: "BELONG_TO" },
		{ label: "Belong To Many", value: "BELONG_TO_MANY" },
	]

	return (
		<div>
			<Navbar />

			{/* Content */}
			<div className="mt-20 pt-12 container">
				<div className="text-xl font-bold mb-6">Create App</div>
				<form onSubmit={formik.handleSubmit} className="w-1/2 space-y-6">
					<Input
						label="App name"
						name="name"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.name}
						errorText={formik.touched.name ? formik.errors.name : undefined}
					/>
					<Input
						label="Desciption"
						name="desciption"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.description}
						errorText={
							formik.touched.description ? formik.errors.description : undefined
						}
					/>

					<div>
						<div className="flex items-center space-x-3">
							<div>Model</div>
							<SidebarButton
								label={(toggle) => (
									<div
										onClick={toggle}
										className="bg-main-blue text-white px-2 py-1 rounded-lg cursor-pointer"
									>
										Create
									</div>
								)}
								content={
									<div className="space-y-5">
										<div className="text-xl font-bold">Create Model</div>
										<div className="space-y-5">
											<Input
												label="Table name"
												name="name"
												defaultValue="Books"
											/>

											<div className="space-y-6">
												<div className="grid grid-cols-4 gap-3 items-center">
													<div>Field name</div>
													<div>Type</div>
													<div>Required</div>
													<div>Default value</div>
												</div>

												<div className="grid grid-cols-4 gap-3 items-center">
													<Input defaultValue="_id" disabled />
													<Select
														options={dataTypes}
														defaultValue="OBJECT_ID"
													/>
													<Checkbox defaultChecked disabled />
													<Input placeholder="" disabled />
												</div>

												<div className="grid grid-cols-4 gap-3 items-center">
													<Input defaultValue="name" />
													<Select options={dataTypes} />
													<Checkbox />
													<Input placeholder="" />
												</div>

												<div className="grid grid-cols-4 gap-3 items-center">
													<Input defaultValue="author" />
													<Select options={dataTypes} />
													<Checkbox />
													<Input placeholder="" />
												</div>
												<div className="ml-3 flex space-x-5">
													<div>
														<div>Reference</div>
														<Select options={relationshipTypes} />
													</div>
													<div>
														<div>Relationship type</div>
														<Select options={relationshipTypes} />
													</div>
												</div>
											</div>
										</div>
										<div className="h-12"></div>
										<div className="bg-main-blue text-white rounded-lg py-2 text-center cursor-pointer">
											Submit
										</div>
									</div>
								}
							/>
						</div>
						<div className="ml-3">
							<div>Books</div>
							<div>User</div>
						</div>
					</div>

					<div>
						<div>APIs</div>
						<div className="ml-3">
							<div className="flex space-x-2">
								<Checkbox label="REST:" checked={true} />
								<span className="">
									https://tront.com/apps/lorem-ipsum-dolor/api/rest
								</span>
							</div>
						</div>
					</div>

					<div>
						<div>Public Permission</div>
						<div className="ml-3">
							<Checkbox label="Create" />
							<Checkbox label="Read" />
							<Checkbox label="Update" />
							<Checkbox label="Delete" />
						</div>
					</div>

					<button
						type="submit"
						className="bg-main-blue w-full py-2 text-white rounded-lg"
					>
						Create App
					</button>
				</form>
			</div>
		</div>
	)
}

export default Index
