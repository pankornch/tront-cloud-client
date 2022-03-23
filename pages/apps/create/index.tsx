import Input from "@/src/components/Forms/Input"
import Navbar from "@/src/components/Navbar"
import { CREATE_APP_MUTATION } from "@/src/gql"
import useErrorText from "@/src/utils/errorText"
import { useMutation } from "@apollo/client"
import { useFormik } from "formik"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useMemo } from "react"
import Swal from "sweetalert2"
import * as Yup from "yup"
import { generateSlug } from "random-word-slugs"
import Auth from "@/src/middlewares/AuthHOC"
import { ChevronLeftIcon } from "@heroicons/react/outline"
import Link from "next/link"

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
		await createApp({ variables: { input: value } })

		await Swal.fire({
			title: "Created!",
			text: "Your app has created.",
			icon: "success",
			confirmButtonColor: "#2680fe",
			timer: 1500,
		})

		router.push(`/apps/${value.slug}/console`)
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

	const getApiUrl = useMemo(() => {
		if (!process.browser) return `${process.env.NEXTAUTH_URL}/api/<slug>/rest`

		const baseUrl = `${location.protocol}//${location.host}`
		return `${baseUrl}/api/${formik.values.slug || "<slug>"}/rest`
	}, [formik.values.slug])

	return (
		<div>
			<Navbar />

			{/* Content */}
			<div className="mt-20 pt-12 container flex flex-col items-center">
				<div className="w-full xl:w-1/2">
					<div className="relative flex justify-center mb-6">
						<div className="text-xl font-medium">Create App</div>
						<Link href="/apps">
							<a>
								<ChevronLeftIcon className="w-6 h-6 absolute inset-y-0 top-0 left-0" />
							</a>
						</Link>
					</div>
					<form onSubmit={formik.handleSubmit} className="space-y-6">
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
							value={formik.values.slug.toLowerCase()}
							errorText={errorText("slug")}
							readOnly
							required
							disabled
						/>
						<div className="flex gap-x-2">
							<div>API endpoint:</div>
							<input className="grow px-2" defaultValue={getApiUrl} readOnly />
						</div>
						<button
							type="submit"
							className="bg-main-blue w-full py-3 text-white rounded-lg"
						>
							Create App
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

// export const getServerSideProps = auth(async () => {
// 	return {
// 		props: {},
// 	}
// })

export default Auth(Index)
