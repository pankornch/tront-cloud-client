import React, { FC, useCallback, useState } from "react"
import { SidebarButton } from "./Sidebar"

import PublicSVG from "@/public/public.svg"
import PrivateSVG from "@/public/lock.svg"
import Input from "../Input"
import Select from "../Select"
import { APIS_STATE, MODELS_STATE } from "@/src/store/states"
import { useRecoilValue } from "recoil"
import { IModel } from "@/src/types"

interface Props {
	type?: "edit" | "view"
	_id: string
}

const SidebarAPI: FC<Props> = (props) => {
	const modelsState = useRecoilValue(MODELS_STATE)
	const apisState = useRecoilValue(APIS_STATE)

	const [selectModel, setSelectModel] = useState<string>(modelsState[0]._id!)

	const getModel = useCallback(() => {
		return modelsState.find((e) => e._id === selectModel)
	}, [modelsState, selectModel])

	const getApiSchema = useCallback(() => {
		return apisState.find((e) => (e.model as IModel)._id === selectModel)
	}, [apisState, selectModel])

	const getApiMethodColor = (name: string) => {
		switch (name) {
			case "GET":
				return "text-main-green"
			case "POST":
				return "text-main-blue"
			case "PATCH":
				return "text-yellow-500"
			case "PUT":
				return "text-orange-500"
			case "DELETE":
				return "text-red-500"
			default:
				return "text-gray-300"
		}
	}

	const statusDot = (status: boolean) => {
		return status ? (
			<div className="bg-main-green text-white rounded-full w-3 h-3"></div>
		) : (
			<div className="bg-gray-300 text-white rounded-full w-3 h-3"></div>
		)
	}

	const statusIcon = (status: boolean) => {
		return status ? (
			<PublicSVG className="w-3 text-main-blue" />
		) : (
			<PrivateSVG className="w-3 text-red-500" />
		)
	}

	return (
		<div>
			<SidebarButton
				label={(open) => (
					<div
						onClick={open}
						className="bg-main-blue text-white px-3 py-1 rounded-full cursor-pointer text-xs"
					>
						Edit
					</div>
				)}
				content={
					<div className="space-y-6">
						<div>API Configures</div>
						<div>
							<Select
								options={modelsState.map((e) => ({
									label: e.name!,
									value: e._id!,
								}))}
								label="Models"
								onChange={(e) => setSelectModel(e.target.value)}
							/>
						</div>

						<div>Model Schema</div>
						<div className="ml-3 space-y-6">
							<div className="grid grid-cols-2 gap-6">
								<div>Field name</div>
								<div>Type</div>
							</div>

							{getModel()?.fields?.map((e, i) => (
								<div key={i} className="grid grid-cols-2 gap-6">
									<Input defaultValue={e.name} disabled />
									<Input defaultValue={e.type} disabled />
								</div>
							))}
						</div>

						<div>API Methods</div>
						<div className="space-y-6 ml-3">
							{getApiSchema()?.methods?.map((e, i) => (
								<div key={i} className="flex items-center space-x-3">
									{statusDot(e.active!)}
									{statusIcon(e.active!)}
									<strong className={`w-20 ${getApiMethodColor(e.name!)}`}>
										{e.name}
									</strong>
									<div>{e.pathname}</div>
								</div>
							))}
						</div>

						<Input
							label="Access token"
							defaultValue="8f1ecb56c1a076125043bb17eb37da2d"
							type="password"
							disabled
						/>

						<div className="space-y-3">
							<button className="bg-main-blue text-white w-full py-2 rounded-lg">
								Save
							</button>
							<button className="bg-gray-400 text-white w-full py-2 rounded-lg">
								Cancel
							</button>
						</div>
					</div>
				}
			/>
		</div>
	)
}

export default SidebarAPI
