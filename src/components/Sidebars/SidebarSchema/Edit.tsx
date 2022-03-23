import { IField, IModel, ISchema } from "@/src/types"
import React, { FC, useEffect, useMemo, useState } from "react"
import Sidebar from "../Sidebar"
import useApiSchema from "@/src/hooks/useApiSchema"
import useModel from "@/src/hooks/useModel"

import PublicSVG from "@/public/public.svg"
import PrivateSVG from "@/public/lock.svg"
import Input from "../../Forms/Input"
import { dataTypes } from "@/src/utils/constants"
import Checkbox from "../../Forms/Checkbox"
import Select from "../../Forms/Select"
import CloseSVG from "@/public/close.svg"
import cloneObj from "@/src/utils/cloneObj"
import Swal from "sweetalert2"
import * as yup from "yup"
import Toast from "../../Toast"
import { ArrowNarrowRightIcon } from "@heroicons/react/outline"

type OnSubmitHandler = (data: ISchema) => void
type OnDeleteHandler = (id: string) => void

export interface EditProps {
	label?: JSX.Element | string
	schema: ISchema
	onSubmit?: OnSubmitHandler
	onDelete?: OnDeleteHandler
	models?: Partial<IModel>[]
}

export const Edit: FC<EditProps> = (props) => {
	const {
		model,
		handleAddField,
		handleChangeField,
		handleChangeModelName,
		handleRemoveField,
		isPrimaryKey,
		handleResetModel,
		validateUniqueFieldName,
	} = useModel(cloneObj(props.schema.model))

	const { apiSchema, handleChangeMethodApi, handleResetApiSchema } =
		useApiSchema({
			model,
			apiSchema: props.schema.apiSchema
				? cloneObj(props.schema.apiSchema)
				: undefined,
		})

	const getApiMethodColor = (name: string) => {
		switch (name) {
			case "POST":
				return "text-main-blue"
			case "PATCH":
				return "text-main-yellow"
			case "PUT":
				return "text-main-orange"
			case "DELETE":
				return "text-main-red"
			default:
				return "text-main-green"
		}
	}

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

	const handleSubmit = async () => {
		const validator = yup.object({
			model: yup.object({
				name: yup.string().required(),
			}),
		})

		if (validateUniqueFieldName.isDuplicated) {
			Toast({
				type: "ERROR",
				title: "Validation error",
				body: `Duplicate field name at ${validateUniqueFieldName.duplicateName}`,
			})
			return
		}

		validator
			.validate({ model })
			.then(async () => {
				if (props.models?.some((e) => e.name === model.name)) {
					Toast({
						type: "ERROR",
						title: "Validation error",
						body: "Model name must be unique",
					})
				} else {
					const result = await Swal.fire({
						title: "Are you sure?",
						text: "You won't be able to revert this!",
						icon: "warning",
						showCancelButton: true,
						confirmButtonColor: "#2680fe",
						cancelButtonColor: "#d33",
						confirmButtonText: "Yes, update it!",
					})

					if (!result.isConfirmed) return
					props.onSubmit?.call(this, {
						apiSchema,
						model,
					})
					handleClose()
				}
			})
			.catch((e) => {
				Toast({ type: "ERROR", title: "Validation error", body: e.message })
			})
	}

	const handleReset = () => {
		handleResetModel()
		handleResetApiSchema()
	}

	const handleCancel = () => {
		handleReset()
		handleClose()
	}

	const handleDelete = async () => {
		const result = await Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#2680fe",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		})

		if (!result.isConfirmed) return

		props.onDelete?.call(this, props.schema.model._id!)
	}

	const renderInput = (field: IField, index: number) => {
		switch (field.type) {
			case "STRING":
				return (
					<Input
						className="w-40"
						value={field.defaultValue}
						onChangeValue={(value) =>
							handleChangeField(value, "defaultValue", index)
						}
						disabled={isPrimaryKey(field)}
					/>
				)
			case "NUMBER":
				return (
					<Input
						className="w-40"
						value={field.defaultValue}
						type="number"
						onChangeValue={(value) =>
							handleChangeField(value, "defaultValue", index)
						}
						disabled={isPrimaryKey(field)}
					/>
				)
			case "BOOLEAN":
				return (
					<Select
						className="w-40"
						value={field.defaultValue}
						options={[
							{ label: "True", value: true },
							{ label: "False", value: false },
						]}
						onInitSelect={(value) => {
							handleChangeField(value, "defaultValue", index)
						}}
						onChangeValue={(value) =>
							handleChangeField(value, "defaultValue", index)
						}
					/>
				)
			case "DATE":
				return (
					<Input
						className="w-40"
						value={field.defaultValue}
						onChangeValue={(value) =>
							handleChangeField(value, "defaultValue", index)
						}
						disabled={isPrimaryKey(field)}
						type="date"
					/>
				)
			default:
				return (
					<Input
						className="w-40"
						value={field.defaultValue}
						onChangeValue={(value) =>
							handleChangeField(value, "defaultValue", index)
						}
						disabled={isPrimaryKey(field)}
					/>
				)
		}
	}

	return (
		<Sidebar.Button
			label={
				props.label ? (
					<>{props.label}</>
				) : (
					<div className="text-xs bg-main-blue px-3 py-1 rounded-full text-white">
						Edit
					</div>
				)
			}
			handleClose={(close) => (handleClose = close)}
		>
			<div>
				<div className="text-xl font-medium">Edit Schema</div>

				<div className="mt-6">
					<div className="mb-3 font-medium">Model</div>
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
								{/* <Input
									className="w-40"
									value={field.defaultValue}
									onChangeValue={(value) =>
										handleChangeField(value, "defaultValue", index)
									}
									disabled={isPrimaryKey(field)}
								/> */}
								{renderInput(field, index)}
								<Checkbox
									onChageValue={(value) =>
										handleChangeField(value, "required", index)
									}
									disabled={isPrimaryKey(field)}
								/>
								<div className="w-12">
									{!isPrimaryKey(field.name) && model.fields!.length > 2 && (
										<div
											onClick={() => handleRemoveField(index)}
											className="hidden group-hover:block bg-main-red text-white p-2 w-fit rounded-full cursor-pointer"
										>
											<CloseSVG className="w-3" />
										</div>
									)}
								</div>
							</div>
						))}

						<button
							type="button"
							onClick={handleAddField}
							className="bg-main-blue p-3 rounded-full mt-3 w-fit hover:scale-110 transition-all"
						>
							<CloseSVG className="w-3 rotate-45 text-white" />
						</button>
					</div>
				</div>

				<div className="mt-12">
					<div className="mb-3 font-medium">API</div>
					<div className="gap-x-3 mb-3 flex">
						<div className="text-sm">Active</div>
						{/* <div className="text-sm">Public</div> */}
						<div className="text-sm">Method</div>
						<div className="text-sm ml-6">Endpoint</div>
					</div>
					<div className="space-y-3">
						{apiSchema.methods.map((method, index) => (
							<div
								key={method.name}
								className="flex gap-x-3 items-center select-none"
							>
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

				<div className="mt-12 space-y-3">
					<button
						type="button"
						className="bg-main-blue text-white rounded-lg py-2 text-center cursor-pointer w-full"
						onClick={handleSubmit}
					>
						Submit
					</button>

					<button
						type="button"
						className="bg-gray-400 text-white rounded-lg py-2 text-center cursor-pointer w-full"
						onClick={handleReset}
					>
						Reset
					</button>

					<button
						type="button"
						className="bg-gray-400 text-white rounded-lg py-2 text-center cursor-pointer w-full"
						onClick={handleCancel}
					>
						Cancel
					</button>

					<button
						type="button"
						className="bg-main-red text-white rounded-lg py-2 text-center cursor-pointer w-full"
						onClick={handleDelete}
					>
						Delete
					</button>
				</div>
			</div>
		</Sidebar.Button>
	)
}
