import Input from "@/src/components/Forms/Input"
import Navbar from "@/src/components/Navbar"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { APP_BY_ID_QUERY } from "@/src/gql"
import { IApp, ISchema } from "@/src/types"
import auth from "@/src/middlewares/auth"
import SidebarSchema from "@/src/components/Sidebars/SidebarSchema"

interface Props {
	query: {
		slug: string
	}
}

const Console: NextPage<Props> = (props) => {
	const router = useRouter()
	const { data, loading } = useQuery<{ app: IApp }>(APP_BY_ID_QUERY, {
		variables: {
			slug: props.query.slug,
		},
	})

	const schemas = useMemo<ISchema[] | undefined>(() => {
		if (!data) return

		// return [
		// 	{
		// 		id: "",
		// 		model: {
		// 			...data.app.modelConfigs.models[0],
		// 		},
		// 	},
		// ]

		const $schemas = []

		for (const model of data.app.modelConfigs.models) {
			$schemas.push({
				model,
				apiSchema: data.app.apiConfigs.apiSchemas.find(
					(e) => e.model?._id === model._id
				),
			})
		}
		console.log($schemas)
		return $schemas
	}, [data])

	if (loading) return <>Loading</>

	return (
		<div>
			<Navbar />
			{/* Content */}
			<div className="container mt-20 py-12 flex justify-center">
				<div className="xl:w-1/2 w-full space-y-6">
					<div className="space-y-6">
						<Input defaultValue={data?.app.name} label="App name" disabled />
						<Input
							defaultValue={data?.app.description}
							label="Description"
							disabled
						/>
						<Input defaultValue={data?.app.slug} label="Slug" disabled />
					</div>

					<div>
						<div>Schema</div>
						<div className="ml-3 space-y-3 mt-3">
							{schemas?.map((e, i) => (
								<div key={i} className="flex space-x-3">
									<div>{e.model.name}</div>
									<SidebarSchema.View schema={e!} />
								</div>
							))}
						</div>
					</div>

					<div>
						<div className="flex space-x-3">
							<div>APIs</div>
						</div>
						{data!.app.apiConfigs!.apiTypes!.map((e, i) => (
							<div key={i} className="space-x-2 ml-3 flex mt-3">
								<input value={e.url} readOnly className="w-full px-2" />
							</div>
						))}
					</div>

					{data!.app.active ? (
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

					<div>
						<Input
							defaultValue="8f1ecb56c1a076125043bb17eb37da2d"
							label="Access Token"
							type="password"
							disabled
						/>
					</div>

					<button
						onClick={() =>
							router.push(`/apps/${router.query.slug}/console/edit`)
						}
						type="submit"
						className="bg-main-blue w-full py-2 text-white rounded-lg"
					>
						Edit App
					</button>
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

export default Console
