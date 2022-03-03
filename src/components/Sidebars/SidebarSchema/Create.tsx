import { dataTypes } from "@/src/utils/constants"
import React, { FC, useEffect, useMemo, useState } from "react"
import Checkbox from "../../Forms/Checkbox"
import Input from "../../Forms/Input"
import Select from "../../Forms/Select"
import Sidebar from "../Sidebar"
import CloseSVG from "@/public/close.svg"
import useModel from "@/src/hooks/useModel"
import useApiSchema from "@/src/hooks/useApiSchema"
import PublicSVG from "@/public/public.svg"
import PrivateSVG from "@/public/lock.svg"
import { ISchema } from "@/src/types"
import shortId from "shortid"

type OnSubmitHandler = (data: ISchema) => void

export interface CreateProps {
	label?: JSX.Element | string
	onSubmit?: OnSubmitHandler
}

const Create: FC<CreateProps> = (props) => {
	const {
		model,
		handleAddField,
		handleChangeField,
		handleChangeModelName,
		handleRemoveField,
		isPrimaryKey,
		handleClearModel,
	} = useModel()

	const {
		apiSchema,
		getApiMethodColor,
		handleChangeMethodApi,
		handleClearApiSchema,
	} = useApiSchema({
		model,
	})

	let handleClose: any

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

	const handleSubmit = () => {
		props.onSubmit?.call(this, { model, apiSchema, id: shortId.generate() })
		handleClose()
	}

	return (
		<Sidebar.Button
			label={
				props.label ? (
					<>{props.label}</>
				) : (
					<div className="text-xs bg-main-blue px-3 py-1 rounded-full text-white">
						Create
					</div>
				)
			}
			handleClose={(close) => (handleClose = close)}
			onClose={() => {
				handleClearModel()
				handleClearApiSchema()
			}}
		>
			<div className="text-xl font-bold">Create Schema</div>

			<div className="mt-12">
				<div className="mb-3">Model</div>
				<Input
					label="Model name"
					name="Model name"
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
					{model.fields!.map((field, index) => (
						<div key={index} className="flex space-x-3 group items-center">
							<Input
								className="w-40"
								value={field.name}
								onChangeValue={(value) =>
									handleChangeField(value, "name", index)
								}
								required
								disabled={isPrimaryKey(field)}
							/>
							<Select
								className="w-40"
								options={dataTypes}
								value={field.type}
								onChangeValue={(value) =>
									handleChangeField(value, "type", index)
								}
								disabled={isPrimaryKey(field)}
							/>
							<Input
								className="w-40"
								value={field.defaultValue}
								onChangeValue={(value) =>
									handleChangeField(value, "defaultValue", index)
								}
								disabled={isPrimaryKey(field)}
							/>
							<Checkbox
								onChageValue={(value) =>
									handleChangeField(value, "required", index)
								}
								disabled={isPrimaryKey(field)}
							/>
							<div className="w-12">
								<div
									onClick={() => handleRemoveField(index)}
									className="hidden group-hover:block bg-main-red text-white p-2 w-fit rounded-full cursor-pointer"
								>
									<CloseSVG className="w-3" />
								</div>
							</div>
						</div>
					))}

					<button
						type="button"
						onClick={handleAddField}
						className="bg-main-blue p-3 rounded-full mt-3 w-fit"
					>
						<CloseSVG className="w-3 rotate-45 text-white" />
					</button>
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
							<div
								className="cursor-pointer w-9"
								onClick={() =>
									handleChangeMethodApi(!method.active, "active", index)
								}
							>
								{statusDot(method.active)}
							</div>
							{/* <div
								className="cursor-pointer w-9 ml-3"
								onClick={() =>
									handleChangeMethodApi(!method.public, "public", index)
								}
							>
								{statusIcon(method.public)}
							</div> */}
							<span
								className={`${getApiMethodColor(method.name)} font-medium w-20`}
							>
								{method.name.startsWith("GET") ? "GET" : method.name}
							</span>
							<span>{method.pathname}</span>
						</div>
					))}
				</div>
			</div>

			<button
				type="button"
				className="bg-main-blue text-white rounded-lg py-2 text-center cursor-pointer w-full mt-12"
				onClick={handleSubmit}
			>
				Submit
			</button>
		</Sidebar.Button>
	)
}

export default Create
