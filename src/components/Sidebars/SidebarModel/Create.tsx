import { IModel } from "@/src/types"
import { FC } from "react"
import React from "react"
import { dataTypes, relationshipTypes } from "@/src/utils/constants"
import Input from "../../Forms/Input"
import Select from "../../Forms/Select"
import Checkbox from "../../Forms/Checkbox"
import CloseSVG from "@/public/close.svg"
import Sidebar from "../Sidebar"
import useModel from "./useModel"

type SubmitHandler<T> = (value: T) => void

export interface CreateProps {
	label: JSX.Element | string
	onSubmit?: SubmitHandler<IModel>
}

const CreateModelSidebar: FC<CreateProps> = (props) => {
	const {
		model,
		handleClearModel,
		handleChangeModelName,
		handleAddField,
		handleRemoveField,
		handleChangeField,
		handleValidateModel,
	} = useModel()

	let handleClose: () => void

	const onSubmit = async () => {
		try {
			await handleValidateModel()
			props.onSubmit?.call(this, model)
			handleClearModel()
			handleClose()
		} catch (error: any) {
			console.log(error.errors)
		}
	}

	return (
		<Sidebar.Button
			label={<>{props.label}</>}
			handleClose={(close) => (handleClose = close)}
			onClose={handleClearModel}
			content={
				<div className="space-y-5">
					<div className="text-xl font-bold">Create Model</div>
					<div className="space-y-5">
						<div className="space-y-6">
							<Input
								label="Model name"
								name="name"
								value={model.name}
								onChange={handleChangeModelName}
								required
							/>
							<div className="grid grid-cols-4 gap-3 items-center">
								<div>Field name</div>
								<div>Type</div>
								<div>Default value</div>
								<div>Required</div>
							</div>

							<div className="grid grid-cols-4 gap-3 items-center">
								<Input defaultValue="_id" disabled />
								<Select options={dataTypes} defaultValue="OBJECT_ID" disabled />
								<Input placeholder="" disabled />
								<Checkbox checked disabled />
							</div>

							{model.fields?.map((e, i) => (
								<div
									key={i}
									className="grid grid-cols-4 gap-3 items-start relative"
								>
									<Input
										onChange={(e) => handleChangeField(e, "name", i)}
										value={e.name}
										name="field"
										required
									/>
									<Select
										options={dataTypes}
										defaultValue="STRING"
										value={e.type}
										onChange={(e) => handleChangeField(e, "type", i)}
									/>
									<Input
										placeholder=""
										value={e.defaultValue}
										onChange={(e) => handleChangeField(e, "defaultValue", i)}
									/>

									<Checkbox
										checked={e.required}
										onChange={(e) => handleChangeField(e, "required", i)}
									/>

									{model.fields!.length > 1 && (
										<div
											onClick={() => handleRemoveField(i)}
											className="bg-main-red text-white p-2 w-fit rounded-full cursor-pointer absolute top-1/2 right-0 transform -translate-y-1/2"
										>
											<CloseSVG className="w-2" />
										</div>
									)}
								</div>
							))}
						</div>

						<button
							type="button"
							onClick={handleAddField}
							className="bg-main-blue p-3 rounded-full"
						>
							<CloseSVG className="w-3 rotate-45 text-white" />
						</button>
					</div>
					<div className="h-12"></div>
					<button
						type="button"
						onClick={onSubmit}
						className="bg-main-blue text-white rounded-lg py-2 text-center cursor-pointer w-full"
					>
						Submit
					</button>
				</div>
			}
		/>
	)
}

export default CreateModelSidebar
