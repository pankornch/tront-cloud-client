import React, { useMemo, useState } from "react"
import { IField, IModel } from "@/src/types"
import * as Yup from "yup"
import cloneObj from "@/src/utils/cloneObj"

const useModel = () => {
	const [model, setModel] = useState<IModel>({
		name: "",
		fields: [{ name: "", type: "STRING", required: false, defaultValue: "" }],
	})

	return useMemo(() => {
		const handleClearModel = () => {
			setModel({
				name: "",
				fields: [
					{ name: "", type: "STRING", required: false, defaultValue: "" },
				],
			})
		}

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

		const handleChangeModelName = (e: React.ChangeEvent<HTMLInputElement>) => {
			setModel((prev) => {
				prev.name = e.target.value
				return cloneObj(prev)
			})
		}

		const handleChangeField = (e: any, type: keyof IField, index: number) => {
			const clone = cloneObj<IModel>(model)
			clone.fields![index][type] =
				type == "required" ? e.target.checked : e.target.value

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

		return {
			model,
			setModel,
			handleAddField,
			handleRemoveField,
			handleChangeField,
			handleClearModel,
			handleChangeModelName,
			handleValidateModel,
		}
	}, [model])
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
