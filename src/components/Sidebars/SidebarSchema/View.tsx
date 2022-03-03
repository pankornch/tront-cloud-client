import useApiSchema from "@/src/hooks/useApiSchema"
import useModel from "@/src/hooks/useModel"
import { ISchema } from "@/src/types"
import cloneObj from "@/src/utils/cloneObj"
import React, { FC } from "react"

import PublicSVG from "@/public/public.svg"
import PrivateSVG from "@/public/lock.svg"
import Sidebar from "../Sidebar"
import Input from "../../Forms/Input"
import Select from "../../Forms/Select"
import { dataTypes } from "@/src/utils/constants"
import Checkbox from "../../Forms/Checkbox"

export interface ViewProps {
	label?: JSX.Element | string
	schema: ISchema
}

const View: FC<ViewProps> = (props) => {
	const { model, handleChangeField, handleChangeModelName } = useModel(
		cloneObj(props.schema.model)
	)

	const { apiSchema, getApiMethodColor } = useApiSchema({
		model,
		apiSchema: props.schema.apiSchema
			? cloneObj(props.schema.apiSchema)
			: undefined,
	})

	const statusDot = (status: boolean) => {
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

	const statusIcon = (status: boolean) => {
		return status ? (
			<PublicSVG className="w-4 text-main-blue" />
		) : (
			<PrivateSVG className="w-3 text-red-500" />
		)
	}

	return (
		<Sidebar.Button
			label={
				props.label ? (
					<>{props.label}</>
				) : (
					<div className="text-xs bg-main-blue px-3 py-1 rounded-full text-white">
						View
					</div>
				)
			}
		>
			<div>
				<div className="text-xl font-bold">View Schema</div>

				<div className="mt-12">
					<div className="mb-3">Model</div>
					<Input
						label="Model name"
						name="Model name"
						value={model.name}
						onChangeValue={handleChangeModelName}
						required
					/>

					<div className="flex space-x-3 mt-6 mb-3">
						<div className="w-40">Field name</div>
						<div className="w-40">Type</div>
						<div className="w-40">Default value</div>
						<div className="">Required</div>
					</div>

					<div className="flex flex-col gap-y-3">
						{model!.fields!.map((field, index) => (
							<div key={index} className="flex space-x-3 group items-center">
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
									className="w-40"
									value={field.defaultValue}
									readOnly
									disabled
								/>
								<Checkbox
									onChageValue={(value) =>
										handleChangeField(value, "required", index)
									}
									disabled
								/>
							</div>
						))}
					</div>
				</div>

				<div className="mt-12">
					<div className="mb-3">API</div>
					<div className="gap-x-3 mb-3 flex">
						<div className="text-sm">Active</div>
						{/* <div className="text-sm">Public</div> */}
						<div className="text-sm">Method</div>
						<div className="text-sm ml-6">Endpoint</div>
					</div>
					<div className="space-y-3">
						{apiSchema.methods.map((method, index) => (
							<div key={method.name} className="flex gap-x-3 items-center">
								<div className="cursor-pointer w-9">
									{statusDot(method.active)}
								</div>
								{/* <div className="cursor-pointer w-9 ml-3">
									{statusIcon(method.public)}
								</div> */}
								<span
									className={`${getApiMethodColor(
										method.name
									)} font-medium w-20`}
								>
									{method.name.startsWith("GET") ? "GET" : method.name}
								</span>
								<span>{method.pathname}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</Sidebar.Button>
	)
}

export default View
