import { NextPage } from "next"
import Navbar from "@/src/components/Navbar"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import Select from "@/src/components/Forms/Select"
import Pagination from "@/src/components/Pagination"
import Table from "@/src/components/Table"
import { useQuery } from "@apollo/client"
import { IApp, IField, IModel, ISchema, ModelTypes } from "@/src/types"
import { APP_BY_ID_QUERY } from "@/src/gql"
import auth from "@/src/middlewares/auth"
import axios from "axios"
import Input from "@/src/components/Forms/Input"
import SidebarSchema from "@/src/components/Sidebars/SidebarSchema"
import Link from "next/link"
import Sidebar from "@/src/components/Sidebars/Sidebar"
import { dataTypes } from "@/src/utils/constants"
import Toast from "@/src/components/Toast"
import { PencilIcon, RefreshIcon, TrashIcon } from "@heroicons/react/solid"
import LoadingSVG from "@/public/loading.svg"
import { useRouter } from "next/router"
import { LoadingLayout } from "@/src/components/Loading/LoadingLayout"
import getApiUrl from "@/src/utils/apiUrl"
import Swal from "sweetalert2"

interface Props {
	query: {
		slug: string
	}
}

const Index: NextPage<Props> = (props) => {
	const [selectData, setSelectData] = useState<string>("Table")
	const [selectPageSize, setSelectPageSize] = useState<number>(10)
	const { data, loading } = useQuery<{ app: IApp }>(APP_BY_ID_QUERY, {
		variables: {
			slug: props.query.slug,
		},
	})
	const router = useRouter()

	const [selectedModel, setSelectedModel] = useState<string>("")

	const [apiData, setApiData] = useState<any>([])

	const [apiLoading, setApiLoading] = useState<boolean>(true)

	const [currentPage, setCurrentPage] = useState<number>(1)

	const [isEmptyData, setIsEmptyData] = useState<boolean>(false)

	const [isEdit, setIsEdit] = useState<boolean>(false)

	const [isDataOpen, setIsDataOpen] = useState<boolean>(false)

	const models = useMemo(() => {
		return data?.app.modelConfigs?.models || []
	}, [data?.app.modelConfigs?.models])

	const [insertForm, setInsertForm] = useState<Record<string, string>>({})

	// fetch api when selectModel
	useEffect(() => {
		if (!data || !selectedModel) return
		router.push(
			{
				pathname: `/apps/${data?.app.slug}/data`,
				query: {
					model: currentModel?.name,
				},
			},
			undefined,
			{ shallow: true }
		)
		fetchApi()
	}, [data, models, selectedModel])

	// when browser loaded
	useEffect(() => {
		if (!router.query.model && !data) return
		if (!data) return
		if (!data.app.modelConfigs.models.length) {
			setIsEmptyData(true)
			return
		}
		const model = data.app.modelConfigs.models.find(
			(e) => e.name === router.query.model
		)
		if (!model) {
			router.replace(`/apps/${router.query.slug}/data`, undefined, {
				shallow: true,
			})
		}
		setSelectedModel(model?._id || data.app.modelConfigs.models[0]._id)
	}, [router.query.model, data])

	const apiUrl = useMemo(() => {
		if (!data) return ""
		const url = data!.app.apiConfigs.apiTypes[0].url!
		const modelName = models.find((e) => e._id === selectedModel)?.name
		return getApiUrl(url, modelName)
	}, [data, selectedModel])

	const currentModel = useMemo(() => {
		return data?.app.modelConfigs.models.find((e) => e._id === selectedModel)
	}, [data?.app.modelConfigs.models, selectedModel])

	// list all schema
	const schemas = useMemo<ISchema[] | undefined>(() => {
		if (!data) return

		const $schemas = []

		for (const model of data.app.modelConfigs.models) {
			$schemas.push({
				model,
				apiSchema: data.app.apiConfigs.apiSchemas.find(
					(e) => (e.model as IModel)._id === model._id
				),
			})
		}

		return $schemas
	}, [data])

	// schema with select model
	const schema = useMemo(() => {
		return schemas?.find((e) => e.model._id === selectedModel)
	}, [schemas, selectedModel])

	// fetch api
	const fetchApi = useCallback(
		async (props?: { page?: number; limit?: number }) => {
			if (
				!schema?.apiSchema?.methods?.find((e) => e.name === "GET_ALL")?.active
			) {
				Toast({
					type: "ERROR",
					title: `Method GET for ${schema?.model.name} API doesn't active!`,
					body: "Enable method GET to fetch data",
				})
				setApiLoading(false)
				setApiData(null)
				return
			}

			if (!data || !currentModel) return
			setApiLoading(true)

			const skip = ((props?.page || currentPage) - 1) * selectPageSize
			const limit = props?.limit || selectPageSize

			const url = `${apiUrl}?skip=${skip}&limit=${limit}`
			const res = await axios.get(url)

			setApiData(res.data)
			setApiLoading(false)
		},
		[data, currentModel]
	)

	const getInputType = (type: ModelTypes) => {
		switch (type) {
			case "NUMBER":
				return "number"
			case "DATE":
				return "datetime-local"
			default:
				return "text"
		}
	}

	const renderDataComponent = useCallback(() => {
		if (!data || !currentModel) return null

		const getKeys = currentModel!.fields!.map((e) => e.name!)

		switch (selectData) {
			case "Table":
				return (
					<div className="w-full overflow-x-scroll shadow-lg rounded-lg overflow-hidden">
						<Table
							keys={getKeys}
							loading={apiLoading}
							data={apiData?.data}
							actions={(row) => (
								<div className="flex justify-evenly">
									<PencilIcon
										className="w-6 h-6 cursor-pointer text-gray-500 hover:scale-125 transition-all"
										onClick={() => {
											if (
												!schema?.apiSchema?.methods?.find(
													(e) => e.name === "PATCH"
												)?.active
											) {
												Toast({
													type: "ERROR",
													title: `Method PATCH for ${schema?.model.name} API doesn't active!`,
													body: "Enable method PATCH to update data",
												})
												return
											}
											setIsEdit(true)
											setInsertForm(row as Record<string, string>)
											console.log(row)
											setIsDataOpen(true)
										}}
									/>
									<TrashIcon
										className="w-6 h-6 cursor-pointer text-main-red  hover:scale-125 transition-all"
										onClick={async () => {
											if (
												!schema?.apiSchema?.methods?.find(
													(e) => e.name === "DELETE"
												)?.active
											) {
												Toast({
													type: "ERROR",
													title: `Method DELETE for ${schema?.model.name} API doesn't active!`,
													body: "Enable method DELETE to delete data",
												})
												return
											}
											const result = await Swal.fire({
												title: "Are you sure?",
												text: "You won't be able to revert this!",
												icon: "warning",
												showCancelButton: true,
												confirmButtonColor: "#2680fe",
												cancelButtonColor: "#d33",
												confirmButtonText: "Yes, delete it!",
											})

											if (result.isConfirmed) {
												await axios.delete(apiUrl + "/" + row._id)

												Swal.fire({
													title: "Deleted!",
													text: "Your app has been deleted.",
													icon: "success",
													confirmButtonColor: "#2680fe",
													timer: 1500,
												})

												fetchApi()
											}
										}}
									/>
								</div>
							)}
						/>
					</div>
				)
			default:
				return (
					<pre className="h-[calc(100vh-100px)] overflow-y-auto p-6 border-2 border-gray-300 rounded-lg shadow-md">
						{apiLoading ? (
							<div className="w-full flex items-center justify-center p-12 h-full space-y-6 cursor-wait">
								<LoadingSVG className="h-12 text-main-blue animate-spin" />
							</div>
						) : (
							<>{JSON.stringify(apiData, null, 2)}</>
						)}
					</pre>
				)
		}
	}, [data, selectData, apiData, apiLoading, currentModel])

	// add data
	const handleInsertData = async () => {
		try {
			if (!schema?.apiSchema?.methods?.find((e) => e.name === "POST")?.active) {
				handleCloseInsertSidebar()
				Toast({
					type: "ERROR",
					title: `Method POST for ${schema?.model.name} API doesn't active!`,
					body: "Enable method POST to insert data",
				})
				return
			}
			const url = isEdit ? `${apiUrl}/${insertForm._id}` : apiUrl
			const method = isEdit ? "patch" : "post"

			if (isEdit) {
				if (
					!schema?.apiSchema?.methods?.find((e) => e.name === "DELETE")?.active
				) {
					Toast({
						type: "ERROR",
						title: `Method DELETE for ${schema?.model.name} API doesn't active!`,
						body: "Enable method DELETE to delete data",
					})
					return
				}
				const result = await Swal.fire({
					title: "Are you sure?",
					text: "You won't be able to revert this!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#2680fe",
					cancelButtonColor: "#d33",
					confirmButtonText: "Yes, update it!",
				})

				if (!result.isConfirmed) return
			}

			delete insertForm._id
			delete insertForm.__v

			await axios({
				url,
				method,
				data: insertForm,
			})

			const body = isEdit ? "Updated" : "Inserted"

			Toast({ type: "SUCCESS", title: "Success", body })
			fetchApi()
			setIsDataOpen(false)
			setInsertForm({})
		} catch (error) {
			console.log(error)
			Toast({
				type: "ERROR",
				title: `Data ${isEdit ? "Inserte" : "Update"} Error`,
			})
		}
	}

	let handleCloseInsertSidebar: () => void

	const renderInput = (field: IField, index: number) => {
		switch (field.type) {
			case "STRING":
				return (
					<Input
						className="w-40"
						placeholder={field.defaultValue.toString() || ""}
						value={insertForm[field.name] || ""}
						onChangeValue={(val) =>
							setInsertForm((prev) => ({
								...prev,
								[field.name]: val,
							}))
						}
					/>
				)
			case "NUMBER":
				return (
					<Input
						className="w-40"
						defaultValue={field.defaultValue.toString() || ""}
						value={insertForm[field.name] || ""}
						type="number"
						onChangeValue={(val) =>
							setInsertForm((prev) => ({
								...prev,
								[field.name]: val,
							}))
						}
					/>
				)
			case "BOOLEAN":
				return (
					<Select
						className="w-40"
						options={[
							{ label: "True", value: true },
							{ label: "False", value: false },
						]}
						value={insertForm[field.name] || ""}
						onInitSelect={(val) =>
							setInsertForm((prev) => ({
								...prev,
								[field.name]: val,
							}))
						}
						onChangeValue={(val) =>
							setInsertForm((prev) => ({
								...prev,
								[field.name]: val,
							}))
						}
					/>
				)
			case "DATE":
				return (
					<Input
						className="w-40"
						value={
							isEdit
								? insertForm[field.name]?.split("T")[0] || ""
								: insertForm[field.name] || ""
						}
						onChangeValue={(val) =>
							setInsertForm((prev) => ({
								...prev,
								[field.name]: val,
							}))
						}
						type="date"
					/>
				)
			default:
				return (
					<Input
						className="w-40"
						value={insertForm[field.name] || ""}
						onChangeValue={(val) =>
							setInsertForm((prev) => ({
								...prev,
								[field.name]: val,
							}))
						}
						disabled
					/>
				)
		}
	}

	return (
		<div>
			<Navbar />
			<LoadingLayout
				isLoading={loading}
				isEmpty={!data || isEmptyData}
				emptyContent={
					<>
						{!data ? (
							<div className="w-screen h-screen flex flex-col justify-center items-center">
								<h3 className="">No App found!</h3>
								<Link href="/apps">
									<a className="mt-3 text-xl text-main-blue underline">
										Back to apps
									</a>
								</Link>
							</div>
						) : (
							<div className="w-screen h-screen flex justify-center items-center">
								<Link href={`/apps/${data?.app.slug}/console`}>
									<a className="text-white bg-main-blue text-lg rounded-lg px-4 py-2">
										Create Schema
									</a>
								</Link>
							</div>
						)}
					</>
				}
			>
				<>
					<div className="container mt-20 py-12">
						<div className="xl:w-3/4 w-full space-y-12 m-auto">
							<div className="flex justify-center items-center space-x-3">
								<h1 className="text-2xl font-bold">API:</h1>

								<Select
									options={models.map((e) => ({
										label: e.name!,
										value: e._id!,
									}))}
									value={selectedModel}
									className="w-40"
									onChangeValue={(e) => setSelectedModel(e)}
								/>

								{schema && (
									<>
										<SidebarSchema.View
											schema={schema}
											label={
												<div className="bg-main-blue px-3 py-1 rounded-lg text-white">
													View
												</div>
											}
										/>
										<Link href={`/apps/${props.query.slug}/console`}>
											<a className="bg-main-blue px-3 py-1 rounded-lg text-white">
												console
											</a>
										</Link>
									</>
								)}
							</div>

							<div className="flex items-center gap-x-3 text-lg">
								<div className="text-semibold">Endpoint:</div>
								<Input className="grow" value={apiUrl} readOnly />
								{/* <Link href={apiUrl}>
								<a className="text-main-blue underline underline-offset-4">{apiUrl}</a>
							</Link> */}
							</div>

							<div className="flex flex-col sm:flex-row justify-end sm:justify-between items-start sm:items-end gap-y-6 sm:gap-0">
								<div className="flex space-x-3 items-end">
									<Select
										options={["Table", "JSON"]}
										label="Data"
										value={selectData}
										onChangeValue={setSelectData}
										className="w-40"
									/>
									<Select
										label="Limit"
										options={[10, 50, 100]}
										value={selectPageSize}
										onChangeValue={(val) => {
											setSelectPageSize(~~val)
											fetchApi({ limit: val })
										}}
										className="w-20"
									/>
								</div>
								<div className="flex gap-x-3">
									<button
										onClick={() => fetchApi()}
										type="button"
										className="bg-main-blue px-3 py-1 rounded-md text-white"
									>
										<RefreshIcon className="w-4" />
									</button>

									<button
										onClick={() => {
											setIsDataOpen(true)
											setIsEdit(false)
										}}
										className="bg-main-blue px-3 py-1 rounded-md text-white"
									>
										Insert
									</button>

									<Sidebar.Popup
										onClose={() => {
											setIsDataOpen(false)
											setInsertForm({})
											setIsEdit(false)
										}}
										show={isDataOpen}
									>
										<div className="flex flex-col gap-y-6">
											<h6>{isEdit ? "Edit" : "Insert"} data</h6>
											<Input
												disabled
												defaultValue={currentModel?.name}
												label="Model name"
											/>

											<div>
												<div className="flex space-x-3 mb-3">
													<div className="w-40">Field name</div>
													<div className="w-40">Type</div>
													<div className="grown">Value</div>
												</div>

												<div className="flex flex-col gap-y-3">
													{currentModel?.fields?.map((field, index) => (
														<div
															key={index}
															className="flex gap-x-3 group items-center"
														>
															<Input
																className="w-40"
																value={field.name}
																readOnly
																required
																disabled
															/>
															<Select
																className="w-40"
																options={dataTypes}
																value={field.type}
																disabled
															/>

															{/* <Input
																className="grown overflow-auto"
																disabled={field.name === "_id"}
																value={insertForm[field.name] || ""}
																type={getInputType(field.type)}
																onChangeValue={(val) =>
																	setInsertForm((prev) => ({
																		...prev,
																		[field.name]: val,
																	}))
																}
															/> */}
															{renderInput(field, index)}
														</div>
													))}
												</div>
											</div>

											<button
												className="bg-main-blue text-white rounded-lg py-2 text-center cursor-pointer w-full mt-12"
												type="button"
												onClick={handleInsertData}
											>
												{isEdit ? "Update" : "Add"}
											</button>
										</div>
									</Sidebar.Popup>
								</div>
							</div>

							{renderDataComponent()}

							<div className="flex justify-between">
								<div>
									Showing {(currentPage - 1) * selectPageSize || 1} to{" "}
									{selectPageSize * currentPage} of {apiData?.totalCounts}{" "}
									results
								</div>
								<Pagination
									currentPage={currentPage}
									pageSize={selectPageSize}
									totalCount={apiData?.totalCounts || 1}
									onPageChange={(p) => {
										setCurrentPage(p)
										fetchApi({ page: p })
									}}
								/>
							</div>
						</div>
					</div>
				</>
			</LoadingLayout>
		</div>
	)
}

export const getServerSideProps = auth(async ({ query }) => {
	return {
		props: { query },
	}
})

export default Index
