import { IModel } from "@/src/types"
import { FC, useEffect, useState } from "react"
import React from "react"
import { dataTypes, relationshipTypes } from "@/src/utils/constants"
import Input from "../../Forms/Input"
import Select from "../../Forms/Select"
import Checkbox from "../../Forms/Checkbox"
import Sidebar from "../Sidebar"

export interface ViewProps {
	label: JSX.Element | string
	model: IModel
}

const ViewModelSidebar: FC<ViewProps> = (props) => {
	const [model, setModel] = useState<IModel>({ name: "", fields: [] })

	useEffect(() => {
		setModel(props.model)
	}, [props.model])

	return (
		<Sidebar.Button
			label={<>{props.label}</>}
			content={
				<div className="space-y-5">
					<div className="text-xl font-bold">View Model</div>
					<div className="space-y-5">
						<div className="space-y-6">
							<Input
								label="Model name"
								name="name"
								value={model.name}
								disabled
								required
							/>
							<div className="grid grid-cols-4 gap-3 items-center">
								<div>Field name</div>
								<div>Type</div>
								<div>Default value</div>
								<div>Required</div>
							</div>

							<div className="grid grid-cols-4 gap-3 items-start">
								<Input defaultValue="_id" disabled />
								<Select options={dataTypes} defaultValue="OBJECT_ID" disabled />
								<Input placeholder="" disabled />
								<Checkbox checked disabled />
							</div>

							{model.fields?.map((e, i) =>
								e.name === "_id" ? null : (
									<div
										key={i}
										className="grid grid-cols-4 gap-3 items-start relative"
									>
										<Input value={e.name} name="field" disabled />
										<Select options={dataTypes} value={e.type} disabled />
										<Input placeholder="" value={e.defaultValue} disabled />
										<Checkbox checked={e.required} disabled />
									</div>
								)
							)}
						</div>
					</div>
				</div>
			}
		/>
	)
}

export default ViewModelSidebar
