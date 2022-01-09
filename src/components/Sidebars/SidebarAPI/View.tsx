import React, { FC, useCallback, useMemo } from "react"
import Sidebar from "../Sidebar"

import Input from "../../Forms/Input"
import { IApiConfig, IApiSchema, IModel } from "@/src/types"
import PublicSVG from "@/public/public.svg"
import PrivateSVG from "@/public/lock.svg"

export interface ViewProps {
	label: JSX.Element | string
	model: IModel
	apiConfig: IApiConfig
}

export const ModelSection: FC<{
	model: IModel
}> = (props) => {
	return (
		<>
			<div>
				<Input defaultValue={props.model.name} disabled label="Model name" />
			</div>

			<div>Model Schema</div>
			<div className="ml-3 space-y-6">
				<div className="grid grid-cols-2 gap-6">
					<div>Field name</div>
					<div>Type</div>
				</div>

				{props.model.fields!.map((e, i) => (
					<div key={i} className="grid grid-cols-2 gap-6">
						<Input defaultValue={e.name} disabled />
						<Input defaultValue={e.type} disabled />
					</div>
				))}
			</div>
		</>
	)
}

const APISection: FC<{ apiSchema: IApiSchema }> = (props) => {
	const getApiSchema = useMemo(() => {
		return props.apiSchema
	}, [props.apiSchema])

	const getApiMethodColor = (name: string) => {
		switch (name) {
			case "POST":
				return "text-main-blue"
			case "PATCH":
				return "text-yellow-500"
			case "PUT":
				return "text-orange-500"
			case "DELETE":
				return "text-red-500"
			default:
				return "text-main-green"
		}
	}

	const statusDot = (status: boolean) => {
		return status ? (
			<div className="bg-main-green text-white rounded-full cursor-pointer text-xs px-2 py-1">
				On
			</div>
		) : (
			<div className="bg-gray-300 text-black rounded-full cursor-pointer text-xs px-2 py-1">
				Off
			</div>
		)
	}

	const statusIcon = (status: boolean) => {
		return status ? (
			<PublicSVG className="w-4 text-main-blue cursor-pointer" />
		) : (
			<PrivateSVG className="w-3 text-red-500 cursor-pointer" />
		)
	}

	return (
		<>
			<div>API Methods</div>
			<div className="space-y-6 ml-3">
				{getApiSchema!.methods!.map((e, i) => (
					<div key={i} className="flex items-center space-x-3">
						{statusDot(e.active!)}
						{statusIcon(e.active!)}
						<strong className={`w-20 ${getApiMethodColor(e.name!)}`}>
							{e.name?.startsWith("GET") ? "GET" : e.name}
						</strong>
						<div>{e.pathname}</div>
					</div>
				))}
			</div>
		</>
	)
}

const getAccessApiToken = () => {
	if (true) return "******************"
	return "f345652f72b7"
}

const ViewAPISidebar: FC<ViewProps> = (props) => {
	const getApiSchema = useCallback(() => {
		return props.apiConfig.schemas!.find(
			(e) => (e.model as string) === props.model._id
		)!
	}, [props])

	return (
		<div>
			<Sidebar.Button
				label={<>{props.label}</>}
				content={
					<div className="space-y-6">
						<div>API Configures</div>
						<ModelSection model={props.model} />
						<APISection apiSchema={getApiSchema()} />
						<Input
							label="Access token"
							defaultValue={getAccessApiToken()}
							type="password"
							disabled
						/>
					</div>
				}
			/>
		</div>
	)
}

export default ViewAPISidebar
