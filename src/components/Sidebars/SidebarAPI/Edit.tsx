import React, { FC, useCallback, useEffect, useState } from "react"
import Sidebar from "../Sidebar"

import PublicSVG from "@/public/public.svg"
import PrivateSVG from "@/public/lock.svg"
import Input from "../../Forms/Input"
import { ApiNames, IApiConfig, IApiSchema, IModel } from "@/src/types"
import cloneObj from "@/src/utils/cloneObj"

const ModelSection: FC<{
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

				{props.model.fields?.map((e, i) => (
					<div key={i} className="grid grid-cols-2 gap-6">
						<Input defaultValue={e.name} disabled />
						<Input defaultValue={e.type} disabled />
					</div>
				))}
			</div>
		</>
	)
}

type ApiChangeHandler = (value: IApiSchema) => void

const APISection: FC<{ apiSchema: IApiSchema; onChange: ApiChangeHandler }> = (
	props
) => {
	const [apiSchema, setApiSchema] = useState<IApiSchema>()

	useEffect(() => {
		setApiSchema(props.apiSchema)
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

	const statusDot = (status: boolean, name: ApiNames) => {
		return (
			<button
				type="button"
				onClick={() => handleToggle(!status, "active", name)}
			>
				{status ? (
					<div className="bg-main-green text-white rounded-full cursor-pointer text-xs px-2 py-1">
						On
					</div>
				) : (
					<div className="bg-gray-300 text-black rounded-full cursor-pointer text-xs px-2 py-1">
						Off
					</div>
				)}
			</button>
		)
	}

	const handleToggle = (
		value: any,
		type: "active" | "public",
		name: ApiNames
	) => {
		const idx = apiSchema?.methods?.findIndex((e) => e.name === name)!
		setApiSchema((prev) => {
			prev!.methods![idx][type] = value
			props.onChange.call(this, prev!)
			return cloneObj(prev)
		})
	}

	const statusIcon = (status: boolean, name: ApiNames) => {
		return (
			<button
				type="button"
				onClick={() => handleToggle(!status, "public", name)}
			>
				{status ? (
					<PublicSVG className="w-4 text-main-blue cursor-pointer" />
				) : (
					<PrivateSVG className="w-3 text-red-500 cursor-pointer" />
				)}
			</button>
		)
	}

	return (
		<>
			<div>API Methods</div>

			<div className="space-y-6 ml-3">
				{apiSchema?.methods?.map((e, i) => (
					<div key={i} className="flex items-center space-x-3">
						{statusDot(e.active!, e.name!)}
						{statusIcon(e.public!, e.name!)}
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

type SubmitHandler = (value: IApiConfig) => void

export interface EditProps {
	label: JSX.Element | string
	model: IModel
	apiConfig: IApiConfig
	onSubmit?: SubmitHandler
}

const EditAPISidebar: FC<EditProps> = (props) => {
	const [apiConfig, setApiConfig] = useState<IApiConfig>(
		cloneObj(props.apiConfig)
	)

	const getApiSchema = useCallback(() => {
		return apiConfig.schemas!.find(
			(e) => (e.model as string) === props.model._id
		)!
	}, [props, apiConfig])

	const reset = () => {
		setApiConfig(cloneObj(props.apiConfig))
	}

	const handleSubmit = () => {
		props.onSubmit?.call(this, apiConfig)
		handleClose()
	}

	const handleChange = (value: IApiSchema) => {
		setApiConfig((prev) => {
			const idx = prev.schemas!.findIndex((e) => e.model === value.model)!
			prev.schemas![idx] = value
			return prev
		})
	}

	let handleClose: () => void

	return (
		<div>
			<Sidebar.Button
				label={<>{props.label}</>}
				onClose={reset}
				handleClose={(close) => (handleClose = close)}
				content={
					<div className="space-y-6">
						<div>API Configures</div>
						<ModelSection model={props.model} />
						<APISection apiSchema={getApiSchema()} onChange={handleChange} />

						<div className="space-y-3">
							<button
								onClick={handleSubmit}
								type="button"
								className="bg-main-blue text-white rounded-lg py-2 text-center cursor-pointer w-full"
							>
								Save
							</button>
							<button
								type="button"
								className="bg-gray-400 text-white rounded-lg py-2 text-center cursor-pointer w-full"
								onClick={() => {
									reset()
									handleClose()
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				}
			/>
		</div>
	)
}

export default EditAPISidebar
