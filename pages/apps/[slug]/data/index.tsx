import { NextPage } from "next"
import Navbar from "@/src/components/Navbar"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import Select from "@/src/components/Forms/Select"
import Pagination from "@/src/components/Pagination"
import Table from "@/src/components/Table"
import { useQuery } from "@apollo/client"
import { IApp, IModel, ISchema } from "@/src/types"
import { APP_BY_ID_QUERY } from "@/src/gql"
import auth from "@/src/middlewares/auth"
import axios from "axios"
import Input from "@/src/components/Forms/Input"
import SidebarSchema from "@/src/components/Sidebars/SidebarSchema"
import LoadingPage from "@/src/components/Loading/LoadingPage"
import Link from "next/link"
import Sidebar from "@/src/components/Sidebars/Sidebar"
import { dataTypes } from "@/src/utils/constants"
import Toast from "@/src/components/Toast"
import { RefreshIcon } from "@heroicons/react/solid"
import LoadingSVG from "@/public/loading.svg"
import { useRouter } from "next/router"

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

	const models = useMemo(() => {
		return data?.app.modelConfigs?.models || []
	}, [data?.app.modelConfigs?.models])

	const [insertForm, setInsertForm] = useState<Record<string, string>>({})

	useEffect(() => {
		if (!data || !selectedModel) return

		fetchApi()
	}, [data, models, selectedModel])

	const apiUrl = useMemo(() => {
		if (!data) return ""
		const url = data!.app.apiConfigs.apiTypes[0].url!
		const $url = `${location.protocol}//${location.host}`
		const modelName = models.find((e) => e._id === selectedModel)?.name
		return (
			url.replace(process.env.NEXT_PUBLIC_BASE_URL_API!, $url) + `/${modelName}`
		)
	}, [data, selectedModel])

	const currentModel = useMemo(() => {
		return data?.app.modelConfigs.models.find((e) => e._id === selectedModel)
	}, [data?.app.modelConfigs.models, selectedModel])

	const renderDataComponent = useCallback(() => {
		if (!data || !currentModel) return null

		const getKeys = currentModel!.fields!.map(
			(e) => e.name!
		)

		switch (selectData) {
			case "Table":
				return (
					<div className="w-full overflow-x-scroll shadow-lg rounded-lg overflow-hidden">
						<Table keys={getKeys} loading={apiLoading} data={apiData.data} />
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

	const schema = useMemo(() => {
		return schemas?.find((e) => e.model._id === selectedModel)
	}, [schemas, selectedModel])

	

	useEffect(() => {
		if (!router.query.model && !data) return

		if (!data) return

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

	const fetchApi = useCallback(
		async (props?: { page?: number; limit?: number }) => {
			if (!data || !currentModel) return
			setApiLoading(true)
			const slug = data!.app.slug
			const modelName = currentModel!.name
			const skip = ((props?.page || currentPage) - 1) * selectPageSize
			const res = await axios.get(
				`/api/rest/${slug}/${modelName}?skip=${skip}&limit=${
					props?.limit || selectPageSize
				}`
			)
			setApiData(res.data)
			setApiLoading(false)
		},
		[data, currentModel]
	)

	const handleInsertData = async () => {
		try {
			await axios.post(apiUrl, insertForm)
			Toast({ type: "SUCCESS", title: "Data Inserted" })
			fetchApi()
			handleCloseInsertSidebar()
			setInsertForm({})
		} catch (error) {
			Toast({ type: "ERROR", title: "Data Inserted Error" })
		}
	}

	let handleCloseInsertSidebar: () => void

	if (loading) return <LoadingPage />

	return (
		<div>
			<Navbar />

			<div className="container mt-20 py-12 space-y-12">
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
							<SidebarSchema.View schema={schema} />
							<Link href={`/apps/${props.query.slug}/console`}>
								<a className="text-xs bg-main-blue px-3 py-1 rounded-full text-white">
									console
								</a>
							</Link>
						</>
					)}
				</div>
				<div>
					<Input value={apiUrl} readOnly />
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
						<Sidebar.Button
							label={
								<div className="bg-main-blue px-3 py-1 rounded-md text-white">
									Insert
								</div>
							}
							handleClose={(close) => (handleCloseInsertSidebar = close)}
						>
							<div className="flex flex-col gap-y-6">
								<h4>Insert data</h4>
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
												className="flex space-x-3 group items-center"
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
												<Input
													className="grown"
													disabled={field.name === "_id"}
													value={insertForm[field.name] || ""}
													onChangeValue={(val) =>
														setInsertForm((prev) => ({
															...prev,
															[field.name]: val,
														}))
													}
												/>
											</div>
										))}
									</div>
								</div>

								<button
									className="bg-main-blue text-white rounded-lg py-2 text-center cursor-pointer w-full mt-12"
									type="button"
									onClick={handleInsertData}
								>
									Add
								</button>
							</div>
						</Sidebar.Button>
					</div>
				</div>

				{renderDataComponent()}

				<div className="flex justify-end">
					<Pagination
						currentPage={currentPage}
						pageSize={selectPageSize}
						totalCount={apiData?.totalCounts || 0}
						onPageChange={(p) => {
							setCurrentPage(p)
							fetchApi({ page: p })
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps = auth(async ({ query }) => {
	return {
		props: { query },
	}
})

export default Index
