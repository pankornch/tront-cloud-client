import Checkbox from "@/src/components/Forms/Checkbox"
import Input from "@/src/components/Forms/Input"
import Navbar from "@/src/components/Navbar"
import SidebarModel from "@/src/components/Sidebars/SidebarModel"
import { IModel } from "@/src/types"
import cloneObj from "@/src/utils/cloneObj"
import useErrorText from "@/src/utils/errorText"
import { useFormik } from "formik"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useCallback, useState } from "react"
import * as Yup from "yup"

interface IForm {
	name: string
	description: string
	slug: string
}

const Index: NextPage = () => {
	const router = useRouter()
	const validator = Yup.object().shape({
		name: Yup.string().required(),
		description: Yup.string().notRequired(),
		slug: Yup.string().required(),
	})

	const onSubmit = (value: IForm) => {
		console.log(value, models)
		router.push("/apps")
	}

	const formik = useFormik<IForm>({
		initialValues: {
			name: "",
			description: "",
			slug: "",
		},
		validationSchema: validator,
		onSubmit,
	})

	const errorText = useErrorText<IForm>(formik)

	const [models, setModels] = useState<IModel[]>([])

	const handleDeleteModel = (index: number) => {
		const clone = cloneObj<IModel[]>(models)
		clone.splice(index, 1)
		setModels(clone)
	}

	const handleInsertModel = (model: IModel) => {
		setModels((prev) => [...prev, model])
	}

	const handleUpdateModel = (model: IModel, index: number) => {
		const clone = cloneObj<IModel[]>(models)
		clone[index] = model
		setModels(clone)
	}

	const getApiUrl = useCallback(() => {
		const baseUrl = "https://tront.com"
		return `${baseUrl}/api/${formik.values.slug || "<slug>"}/rest`
	}, [formik.values.slug])

	return (
		<div>
			<Navbar />

			{/* Content */}
			<div className="mt-20 pt-12 container flex flex-col items-center">
				<div className="text-xl font-bold mb-6">Create App</div>
				<form
					onSubmit={formik.handleSubmit}
					className="w-full xl:w-1/2 space-y-6"
				>
					<Input
						label="App name"
						name="name"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.name}
						errorText={errorText("name")}
					/>
					<Input
						label="Desciption"
						name="description"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.description}
						errorText={errorText("description")}
					/>
					<Input
						label="Slug"
						name="slug"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						placeholder={formik.values.name}
						value={formik.values.slug}
						errorText={errorText("slug")}
					/>

					<div>
						<div className="flex items-center space-x-3">
							<div>Model</div>
							<SidebarModel.Create
								label={
									<div className="bg-main-blue text-sm px-3 py-1 rounded-full text-white">
										Create
									</div>
								}
								onSubmit={handleInsertModel}
							/>
						</div>
						<div className="ml-3 space-y-3">
							{models.map((e, i) => (
								<SidebarModel.Edit
									key={i}
									label={
										<div className="underline underline-offset-4">{e.name}</div>
									}
									model={e}
									onSubmit={(value) => handleUpdateModel(value, i)}
									onDelete={() => handleDeleteModel(i)}
								/>
							))}
						</div>
					</div>

					<div>
						<div>APIs</div>
						<div className="ml-3">
							<div className="flex space-x-2">
								<Checkbox label="REST:" checked={true} />
								<span className="">{getApiUrl()}</span>
							</div>
						</div>
					</div>

					<button
						type="submit"
						className="bg-main-blue w-full py-2 text-white rounded-lg"
					>
						Create App
					</button>
				</form>
			</div>
		</div>
	)
}

export default Index
