import Navbar from "@/src/components/Navbar"
import { APPS_QUERY } from "@/src/gql"
import auth from "@/src/middlewares/auth"
import { IApp } from "@/src/types"
import { useQuery } from "@apollo/client"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const Index: NextPage = () => {
	const router = useRouter()
	const { data, loading } = useQuery<{ apps: IApp[] }>(APPS_QUERY)
	const getStatus = (status: boolean) => {
		return status ? (
			<div className="bg-main-green text-white rounded-full text-xs px-2 py-1">
				On
			</div>
		) : (
			<div className="bg-gray-300 text-black rounded-full text-xs px-2 py-1">
				Off
			</div>
		)
	}

	const getApiUrl = (url: string) => {
		const $url = `${location.protocol}//${location.host}`
		return url.replace(process.env.NEXT_PUBLIC_BASE_URL_API!, $url)
	}

	if (loading) return <>Loading</>
	return (
		<div>
			<Navbar />

			{/* Content */}
			<div className="container mt-20 py-12">
				{/* nav */}
				<div className="flex justify-between items-center">
					<div className="text-xl">Apps</div>
					<Link href="/apps/create">
						<a className="bg-main-blue text-white px-3 py-2 cursor-pointer rounded-lg">
							Create App
						</a>
					</Link>
				</div>

				{/* apps */}

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
					{data?.apps.map((app) => (
						<div
							key={app._id}
							className="shadow-lg rounded-lg px-6 py-4 border border-gray-100 hover:border-main-blue-light"
						>
							<div className="flex justify-between items-center">
								<div className="text-lg font-bold">{app.name}</div>
								<div className="text-main-green text-lg">
									{getStatus(app.active!)}
								</div>
							</div>
							{app?.apiConfigs?.apiTypes?.map((api) => (
								<div key={api.type} className="text-sm my-3 flex">
									<span className="font-bold mr-2">{api.type}:</span>
									<input
										type="text"
										defaultValue={getApiUrl(api.url!)}
										className="px-2 w-full"
										readOnly
									/>
								</div>
							))}

							<span className="text-xs">2021-03-24</span>
							<div className="flex space-x-3">
								<button
									onClick={() => router.push(`/apps/${app.slug}/console`)}
									className="bg-main-blue text-white px-3 py-1 rounded-md w-fit mt-3"
								>
									Open App
								</button>
								<button
									onClick={() => router.push(`/apps/${app.slug}/data`)}
									className="bg-main-green text-white px-3 py-1 rounded-md w-fit mt-3"
								>
									Data
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps = auth(async () => {
	return {
		props: {},
	}
})
export default Index
