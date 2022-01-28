import React, { useMemo, useRef, useState } from "react"
import { IField, IModel } from "@/src/types"
import * as Yup from "yup"
import cloneObj from "@/src/utils/cloneObj"

const defaultValue = (data?: Partial<IModel>) => {
	return (
		data || {
			name: "",
			fields: [
				{ name: "_id", type: "OBJECT_ID", required: false, defaultValue: "" },
				{ name: "", type: "STRING", required: false, defaultValue: "" },
			],
		}
	)
}

const isPrimaryKey = (field: IField | string) => {
	if (typeof field === "string" && field === "_id") return true
	if (typeof field === "object" && field.name === "_id") return true
	return false
}

const useModel = (modelProps?: IModel) => {
	const [model, setModel] = useState<Partial<IModel>>(defaultValue(modelProps))
	const cloneRef = useRef<IModel>()

	return useMemo(() => {
		const handleValidateModel = () => {
			return Yup.object()
				.shape({
					name: Yup.string().required(),
					fields: Yup.array(
						Yup.object({
							name: Yup.string().required(),
							type: Yup.string().required(),
							required: Yup.boolean().required(),
						})
					),
				})
				.validate(model)
		}

		const handleChangeModelName = (value: string) => {
			setModel((prev) => {
				prev.name = value
				return cloneObj(prev)
			})
		}

		const handleChangeField = (
			value: any,
			type: keyof IField,
			index: number
		) => {
			const clone = cloneObj<any>(model)
			clone.fields[index][type] = value

			setModel(clone)
		}

		const handleRemoveField = (index: number) => {
			const clone = cloneObj<IModel>(model)

			clone.fields?.splice(index, 1)
			setModel(clone)
		}

		const handleAddField = () => {
			const clone = cloneObj<IModel>(model)
			clone.fields!.push({
				name: "",
				type: "STRING",
				required: false,
				defaultValue: "",
			})
			setModel(clone)
		}

		const handleClearModel = () => {
			setModel(defaultValue(modelProps))
		}

		const handleResetModel = () => {
			setModel(cloneRef.current!)
		}

		if (modelProps) {
			cloneRef.current = cloneObj(modelProps)
		}

		return {
			model,
			setModel,
			handleAddField,
			handleRemoveField,
			handleChangeField,
			handleClearModel,
			handleChangeModelName,
			handleValidateModel,
			isPrimaryKey,
			handleResetModel,
		}
	}, [model, modelProps])
}

export default useModel

// const validateFieldName = () => {
// 	const map: { [key: string]: number[] } = {}
// 	let isError = false

// 	for (let i = 0; i < model.fields!.length; i++) {
// 		const currField = model.fields![i]
// 		if (map[currField.name!]) {
// 			isError = true
// 			map[currField.name!].push(i)
// 		} else map[currField.name!] = [i]
// 	}

// 	let errors: { [key: string]: number[] } = {}
// 	if (isError) {
// 		Object.entries(map).forEach(([k, v]) => {
// 			if (v.length > 1) errors[k] = v
// 		})
// 	}

// 	return { isError, errors: isError ? errors : undefined }
// }
