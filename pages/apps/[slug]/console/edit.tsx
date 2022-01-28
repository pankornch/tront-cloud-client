import React, { useMemo } from "react"
import Checkbox from "@/src/components/Forms/Checkbox"
import Input from "@/src/components/Forms/Input"
import Navbar from "@/src/components/Navbar"
import { GetServerSidePropsContext, NextPage } from "next"

import { IApiConfigs, IApp, ISchema } from "@/src/types"

import { useRouter } from "next/router"
import SidebarSchema from "@/src/components/Sidebars/SidebarSchema"
import { useQuery } from "@apollo/client"
import { APP_BY_ID_QUERY } from "@/src/gql"

interface Props {
	query: {
		slug: string
	}
}

const EditApp: NextPage<Props> = (props) => {
	const { data, loading } = useQuery<{ app: IApp }>(APP_BY_ID_QUERY, {
		variables: {
			slug: props.query.slug,
		},
	})

	const router = useRouter()

	const handleSubmit = (value: IApiConfigs) => {
		// setApp((prev) => {
		// 	prev.apiConfig = value
		// 	return cloneObj(prev)
		// })
	}

	const schemas = useMemo<ISchema[] | undefined>(() => {
		if (!data) return

		const $schemas = []

		for (const model of data.app.modelConfigs.models) {
			$schemas.push({
				model,
				apiSchema: data.app.apiConfigs.apiSchemas.find(
					(e) => e.model?._id === model._id
				),
			})
		}

		return $schemas
	}, [data])

	return (
		<div>
			<Navbar />
			{/* Content */}
			<div className="container mt-20 py-12 flex justify-center">
				<div className="w-full xl:w-1/2 space-y-6">
					<div className="space-y-6">
						<Input defaultValue="Lorem ipsum dolor" label="App name" />
						<Input defaultValue="Lorem ipsum dolor" label="Description" />
						<Input defaultValue="Lorem ipsum dolor" label="Slug" />
					</div>

					<div>
						<div>Schema</div>
						<div className="ml-3 space-y-3 mt-3">
							{schemas?.map((e, i) => (
								<div key={i} className="flex space-x-3">
									<div>{e.model.name}</div>
									<SidebarSchema.Edit schema={e} />
								</div>
							))}
						</div>
					</div>

					<div>
						<div className="flex space-x-3">
							<div>APIs</div>
						</div>
						{data?.app.apiConfigs!.apiTypes!.map((e, i) => (
							<div key={i} className="space-x-3 ml-3 flex mt-3">
								<Checkbox label={e.type} checked={true} />
								<input value={e.url} readOnly className="w-full px-3" />
							</div>
						))}
					</div>
					<div className="cursor-pointer">
						{data?.app.active ? (
							<div className="flex space-x-3">
								<div className="bg-main-green rounded-full w-12 h-6 flex px-1 items-center justify-end">
									<div className="w-5 h-5 bg-white rounded-full"></div>
								</div>
								<span>Enable API</span>
							</div>
						) : (
							<div className="flex space-x-3">
								<div className="bg-gray-400 rounded-full w-12 h-6 flex px-1 items-center justify-start">
									<div className="w-5 h-5 bg-white rounded-full"></div>
								</div>
								<span>Disable API</span>
							</div>
						)}
					</div>

					<div className="space-y-3">
						<button
							type="button"
							className="bg-main-blue w-full py-2 text-white rounded-lg"
						>
							Save
						</button>
						<button
							type="button"
							className="bg-gray-400 w-full py-2 text-white rounded-lg"
							onClick={() => router.push(`/apps/${data?.app.slug}/console`)}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps = ({ query }: GetServerSidePropsContext) => {
	return {
		props: { query },
	}
}

export default EditApp
