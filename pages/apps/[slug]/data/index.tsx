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

	const [selectedModel, setSelectedModel] = useState<string>("")

	const [apiData, setApiData] = useState<any[]>([])

	const [apiLoading, setApiLoading] = useState<boolean>(true)

	const [currentPage, setCurrentPage] = useState<number>(1)

	const fetchApi = async (arg: { slug: string; modelName: string }) => {
		const res = await axios.get(`/api/rest/${arg.slug}/${arg.modelName}`)
		setApiData(res.data.data)
		setApiLoading(false)
	}

	const models = useMemo(() => {
		return data?.app.modelConfigs?.models || []
	}, [data?.app.modelConfigs?.models])

	useEffect(() => {
		if (!data || !selectedModel) return

		fetchApi({
			slug: data.app!.slug!,
			modelName: models.find((e) => e._id === selectedModel)!.name!,
		})
	}, [data, models, selectedModel])

	const getApiUrl = useCallback(
		(url: string) => {
			const $url = `${location.protocol}//${location.host}`
			const modelName = models.find((e) => e._id === selectedModel)?.name
			return (
				url.replace(process.env.NEXT_PUBLIC_BASE_URL_API!, $url) +
				`/${modelName}`
			)
		},
		[models, selectedModel]
	)

	const renderDataComponent = useCallback(() => {
		if (!data) return null

		const getKeys = data.app!.modelConfigs!.models![0]!.fields!.map(
			(e) => e.name!
		)

		switch (selectData) {
			case "Table":
				return (
					<div className="w-full overflow-x-scroll shadow-lg rounded-lg overflow-hidden">
						<Table data={apiData} keys={getKeys} loading={apiLoading} />
					</div>
				)
			default:
				return (
					<pre className="h-[calc(100vh-100px)] overflow-y-auto p-6 border-2 border-gray-300 rounded-lg shadow-md">
						{JSON.stringify(apiData, null, 2)}
					</pre>
				)
		}
	}, [data, selectData, apiData, apiLoading])

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

	const currentModel = useMemo(() => {
		return data?.app.modelConfigs.models.find((e) => e._id === selectedModel)
	}, [data?.app.modelConfigs.models, selectedModel])

	if (loading) return <>loading</>

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
						onInitSelect={setSelectedModel}
						className="w-40"
						onChangeValue={(e) => setSelectedModel(e)}
					/>
					{schema && <SidebarSchema.View schema={schema} />}
				</div>
				<div>
					<Input
						value={getApiUrl(data?.app.apiConfigs.apiTypes![0]!.url!)}
						readOnly
					/>
				</div>

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
						onChangeValue={(val) => setSelectPageSize(~~val)}
						className="w-20"
					/>
				</div>

				{renderDataComponent()}

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

export const getServerSideProps = auth(async ({ query }) => {
	return {
		props: { query },
	}
})

export default Index
