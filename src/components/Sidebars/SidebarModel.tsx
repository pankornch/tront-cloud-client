import { IModel } from "@/src/types"
import React, { FC } from "react"
import Checkbox from "../Checkbox"
import Input from "../Input"
import Select from "../Select"
import { SidebarButton } from "./Sidebar"

const dataTypes = [
	{ label: "String", value: "STRING" },
	{ label: "Number", value: "NUMBER" },
	{ label: "Object", value: "OBJECT" },
	{ label: "Array", value: "ARRAY" },
	{ label: "Object ID", value: "OBJECT_ID" },
	{ label: "Date", value: "DATE" },
]
const relationshipTypes = [
	{ label: "Has One", value: "HAS_ONE" },
	{ label: "Has Many", value: "HAS_MANY" },
	{ label: "Belong To", value: "BELONG_TO" },
	{ label: "Belong To Many", value: "BELONG_TO_MANY" },
]

interface Props {
	title?: string
	label: (open: () => void) => JSX.Element | JSX.Element[] | string
	model?: IModel
	canSubmit?: boolean
}

const SidebarModel: FC<Props> = (props) => {
	return (
		<SidebarButton
			label={props.label}
			content={
				<div className="space-y-5">
					<div className="text-xl font-bold">{props.title}</div>
					<div className="space-y-5">
						<Input
							label="Table name"
							name="name"
							defaultValue={props.model?.name}
							disabled
						/>

						<div className="space-y-6">
							<div className="grid grid-cols-4 gap-3 items-center">
								<div>Field name</div>
								<div>Type</div>
								<div>Required</div>
								<div>Default value</div>
							</div>

							{props.model?.fields?.map((e, i) => (
								<div key={i}>
									<div className="grid grid-cols-4 gap-3 items-center">
										<Input defaultValue={e.name} disabled />
										<Select
											options={dataTypes}
											defaultValue={e.type}
											disabled
										/>
										<Checkbox defaultChecked={e.isRequired} disabled />
										<Input defaultValue={e.defaultValue} disabled />
									</div>
									{e.relationship && (
										<div className="ml-5 mt-3 flex space-x-5">
											<div>
												<div>Target</div>
												<Select
													options={["Books._id"]}
													defaultValue={"Books._id"}
													disabled
												/>
											</div>
											<div>
												<div>Relationship type</div>
												<Select
													options={relationshipTypes}
													defaultValue={e.relationship.type}
													disabled
												/>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
					<div className="h-12"></div>
					{props.canSubmit && (
						<div className="bg-main-blue text-white rounded-lg py-2 text-center cursor-pointer">
							Submit
						</div>
					)}
				</div>
			}
		/>
	)
}

export default SidebarModel
