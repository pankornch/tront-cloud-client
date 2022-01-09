import Checkbox from "@/src/components/Forms/Checkbox"
import Input from "@/src/components/Forms/Input"
import Navbar from "@/src/components/Navbar"
import SidebarModel from "@/src/components/Sidebars/SidebarModel"
import { GetServerSidePropsContext, NextPage } from "next"
import { useRouter } from "next/router"
import { MOCK_APPS } from "@/src/mock"
import SidebarAPI from "@/src/components/Sidebars/SidebarAPI"
import React from "react"

interface Props {
	query: {
		slug: string
	}
}

const Console: NextPage<Props> = (props) => {
	const router = useRouter()
	const getApp = () => MOCK_APPS.find((e) => e.slug === props.query.slug)!
	const app = getApp()

	return (
		<div>
			<Navbar />
			{/* Content */}
			<div className="container mt-20 py-12 flex justify-center">
				<div className="xl:w-1/2 w-full space-y-6">
					<div className="space-y-6">
						<Input defaultValue="Lorem ipsum dolor" label="App name" disabled />
						<Input
							defaultValue="Lorem ipsum dolor"
							label="Description"
							disabled
						/>
						<Input defaultValue="Lorem ipsum dolor" label="Slug" disabled />
					</div>

					<div>
						<div>Models</div>
						<div className="ml-3 space-y-3 mt-3">
							{app.modelConfigs!.models!.map((e, i) => (
								<div key={i} className="flex space-x-2">
									<div className="underline underline-offset-4">{e.name}</div>
									<SidebarModel.View
										label={
											<div className="bg-main-blue text-xs px-3 py-1 rounded-full text-white">
												View
											</div>
										}
										model={e}
									/>

									<SidebarAPI.View
										label={
											<div className="bg-main-blue text-xs px-3 py-1 rounded-full text-white">
												API
											</div>
										}
										model={e}
										apiConfig={app.apiConfig!}
									/>

									<button
										className="bg-main-green text-xs px-3 py-1 rounded-full text-white"
										type="button"
										onClick={() => router.push(`/apps/${app.slug}/data`)}
									>
										Data (12)
									</button>
								</div>
							))}
						</div>
					</div>

					<div>
						<div className="flex space-x-3">
							<div>APIs</div>
						</div>
						{app.apiConfig!.apiTypes!.map((e, i) => (
							<div key={i} className="space-x-2 ml-3 flex mt-3">
								<Checkbox label={e.type} checked={true} disabled />
								<input value={e.url} readOnly className="w-full px-2" />
							</div>
						))}
					</div>

					{app.active ? (
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

export const getServerSideProps = ({ query }: GetServerSidePropsContext) => {
	return {
		props: { query },
	}
}

export default Console
