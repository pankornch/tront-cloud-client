import React, { useState } from "react"
import Checkbox from "@/src/components/Forms/Checkbox"
import Input from "@/src/components/Forms/Input"
import Navbar from "@/src/components/Navbar"
import SidebarModel from "@/src/components/Sidebars/SidebarModel"
import { GetServerSidePropsContext, NextPage } from "next"

import SidebarAPI from "@/src/components/Sidebars/SidebarAPI"
import { MOCK_APPS } from "@/src/mock"
import { IApiConfig, IApp } from "@/src/types"
import cloneObj from "@/src/utils/cloneObj"
import { useRouter } from "next/router"

interface Props {
	query: {
		slug: string
	}
}

const EditApp: NextPage<Props> = (props) => {
	const getApp = () => MOCK_APPS.find((e) => e.slug === props.query.slug)!
	const [app, setApp] = useState<IApp>(getApp())

	const router = useRouter()

	const handleSubmit = (value: IApiConfig) => {
		setApp((prev) => {
			prev.apiConfig = value
			return cloneObj(prev)
		})
	}

	const toggleActive = () => {
		setApp((prev) => {
			prev.active = !prev.active
			return cloneObj(prev)
		})
	}

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
						<div>Models</div>
						<div className="ml-3 space-y-3 mt-3">
							{app.modelConfigs!.models!.map((e, i) => (
								<div key={i} className="flex space-x-2">
									<div className="underline underline-offset-4">{e.name}</div>
									<SidebarModel.Edit
										label={
											<div className="bg-main-blue text-xs px-3 py-1 rounded-full text-white">
												Edit Model
											</div>
										}
										model={e}
									/>

									<SidebarAPI.Edit
										label={
											<div className="bg-main-blue text-xs px-3 py-1 rounded-full text-white">
												Edit API
											</div>
										}
										model={e}
										apiConfig={app.apiConfig!}
										onSubmit={handleSubmit}
									/>
								</div>
							))}
						</div>
					</div>

					<div>
						<div className="flex space-x-3">
							<div>APIs</div>
						</div>
						{app.apiConfig!.apiTypes!.map((e, i) => (
							<div key={i} className="space-x-3 ml-3 flex mt-3">
								<Checkbox label={e.type} checked={true} />
								<input value={e.url} readOnly className="w-full px-3" />
							</div>
						))}
					</div>
					<div onClick={toggleActive} className="cursor-pointer">
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
							onClick={() => router.push(`/apps/${app.slug}/console`)}
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
