import Input from "@/src/components/Forms/Input"
import Navbar from "@/src/components/Navbar"
import SidebarSchema from "@/src/components/Sidebars/SidebarSchema"
import { CREATE_APP_MUTATION } from "@/src/gql"
import auth from "@/src/middlewares/auth"
import { IApiSchema, IModel, ISchema } from "@/src/types"
import cloneObj from "@/src/utils/cloneObj"
import useErrorText from "@/src/utils/errorText"
import { useMutation } from "@apollo/client"
import { useFormik } from "formik"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useMemo, useState } from "react"
import Swal from "sweetalert2"
import * as Yup from "yup"
import { generateSlug } from "random-word-slugs"

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

	const [createApp] = useMutation(CREATE_APP_MUTATION)

	const onSubmit = async (value: IForm) => {
		let models: IModel[] = []
		let apiSchemas: IApiSchema[] = []

		for (const schema of schemas) {
			// @ts-ignore
			delete schema.model._id
			// @ts-ignore
			models.push(schema!.model!)
			// @ts-ignore
			apiSchemas.push(schema!.apiSchema!)
		}

		const apiTypes = [{ type: "REST", url: `/api/rest/${value.slug}` }]

		const data = {
			...value,
			modelConfigs: { models },
			apiConfigs: {
				apiTypes: apiTypes,
				apiSchemas: apiSchemas,
			},
		}

		await createApp({ variables: { input: data } })

		await Swal.fire({
			title: "Created!",
			text: "Your app has created.",
			icon: "success",
			confirmButtonColor: "#2680fe",
			timer: 1500,
		})

		router.push("/apps")
	}

	const formik = useFormik<IForm>({
		initialValues: {
			name: "",
			description: "",
			slug: generateSlug(),
		},
		validationSchema: validator,
		onSubmit,
	})

	const errorText = useErrorText<IForm>(formik)

	const [schemas, setSchemas] = useState<ISchema[]>([])

	const handleInsertSchema = (data: ISchema) => {
		setSchemas((prev) => [...prev, data])
	}

	const handleUpdateSchema = (data: ISchema) => {
		setSchemas((prev) => {
			const idx = schemas.findIndex((e) => e.id === data.id)
			prev[idx] = data
			return cloneObj(prev)
		})
	}

	const handleDeleteSchema = (id: string) => {
		setSchemas((prev) => {
			prev = prev.filter((e) => e.id !== id)
			return cloneObj(prev)
		})
	}

	const getApiUrl = useMemo(() => {
		if (!process.browser) return `${process.env.NEXTAUTH_URL}/api/<slug>/rest`

		const baseUrl = `${location.protocol}//${location.host}`
		return `${baseUrl}/api/${formik.values.slug || "<slug>"}/rest`
	}, [formik.values.slug])

	const getSlug = useMemo(() => {
		return generateSlug()
	}, [])

	return (
		<div>
			<Navbar />

			{/* Content */}
			<div className="mt-20 pt-12 container flex flex-col items-center">
				<div className="text-xl font-medium mb-6">Create App</div>
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
						required
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
						// placeholder={getSlug}
						value={formik.values.slug.toLowerCase()}
						errorText={errorText("slug")}
						readOnly
						required
					/>

					<div>
						<div className="flex items-center space-x-3">
							<div>Schema</div>
							<SidebarSchema.Create onSubmit={handleInsertSchema} />
						</div>
						<div className="space-y-3 mt-3">
							{schemas.map((schema) => (
								<div key={schema.id} className="flex gap-x-3">
									<div>{schema.model.name}</div>
									<SidebarSchema.Edit
										schema={schema}
										onSubmit={handleUpdateSchema}
										onDelete={handleDeleteSchema}
									/>
								</div>
							))}
						</div>
					</div>

					<div>
						<div>API</div>
						<div className="ml-3">
							<div className="flex space-x-2">
								<span className="">{getApiUrl}</span>
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

export const getServerSideProps = auth(async () => {
	return {
		props: {},
	}
})

export default Index
