import Input from "@/src/components/Forms/Input"
import Navbar from "@/src/components/Navbar"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, {
	createContext,
	FC,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react"
import {
	ApolloQueryResult,
	OperationVariables,
	useMutation,
	useQuery,
} from "@apollo/client"
import {
	APP_BY_ID_QUERY,
	DELETE_APP_MUTATION,
	UPDATE_API_SCHEMA_MUTATION,
	UPDATE_APP_MUTATIION,
	UPDATE_MODEL_MUTATION,
} from "@/src/gql"
import { IApp } from "@/src/types"
import auth from "@/src/middlewares/auth"
import SidebarSchema from "@/src/components/Sidebars/SidebarSchema"

import Tab from "@/src/components/Tab"
import mapSchemas from "@/src/utils/mapSchemas"
import Link from "next/link"
import apiUrl from "@/src/utils/apiUrl"
import { useFormik } from "formik"
import * as Yup from "yup"
import Swal from "sweetalert2"
import { ISchema } from "@/src/types"

interface Props {
	query: {
		slug: string
	}
}

type Refetch = (variables?: Partial<OperationVariables> | undefined) => Promise<
	ApolloQueryResult<{
		app: IApp
	}>
>

const Context = createContext<{
	app?: IApp
	refetch?: Refetch
}>({})

interface IForm {
	name: string
	description: string
	slug: string
}

const App: FC = () => {
	const router = useRouter()

	const { app, refetch } = useContext(Context)
	const [updateApp] = useMutation(UPDATE_APP_MUTATIION)
	const [deleteApp] = useMutation(DELETE_APP_MUTATION)

	const [isEdit, setIsEdit] = useState<boolean>(false)

	const validator = Yup.object().shape({
		name: Yup.string().required(),
		description: Yup.string().notRequired(),
		slug: Yup.string().required(),
	})

	const handleSubmit = async (values: IForm) => {
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

		await updateApp({
			variables: {
				input: {
					_id: app!._id,
					name: values.name,
					description: values.description,
				},
			},
		})

		await Swal.fire({
			title: "Updated!",
			text: "Your app has updated.",
			icon: "success",
			confirmButtonColor: "#2680fe",
			timer: 1500,
		})

		refetch?.call(this)
		setIsEdit(false)
	}

	const formik = useFormik<IForm>({
		initialValues: {
			name: app!.name,
			description: app!.description,
			slug: app!.slug,
		},
		validationSchema: validator,
		onSubmit: handleSubmit,
	})

	const handelOpenEdit = () => {
		setIsEdit(true)
	}
	const handleCancel = () => {
		setIsEdit(false)
		formik.handleReset(null)
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

		if (result.isConfirmed) {
			await deleteApp({
				variables: {
					input: {
						_id: app!._id,
					},
				},
			})
			await Swal.fire({
				title: "Deleted!",
				text: "Your app has been deleted.",
				icon: "success",
				confirmButtonColor: "#2680fe",
				timer: 1500,
			})

			router.replace("/apps")
		}
	}

	const $value = useCallback(
		(key: keyof IForm) => {
			return isEdit ? formik.values[key] : app![key]
		},
		[app, formik.values, isEdit]
	)

	return (
		<div>
			<h3 className="text-xl mb-6">App Details</h3>
			<form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-6">
				<Input
					name="name"
					value={$value("name")}
					onChange={formik.handleChange}
					label="App name"
					disabled={!isEdit}
					required
				/>
				<Input
					name="description"
					value={$value("description")}
					label="Description"
					disabled={!isEdit}
					onChange={formik.handleChange}
				/>
				<Input
					name="slug"
					value={$value("slug")}
					onChange={formik.handleChange}
					label="Slug"
					disabled={!isEdit}
					required
				/>

				{isEdit ? (
					<>
						<button
							type="submit"
							className="text-white bg-main-blue px-6 py-3 w-full rounded-lg mt-6"
						>
							Save
						</button>
						<button
							type="button"
							onClick={handleCancel}
							className="text-white bg-gray-400 px-6 py-3 w-full rounded-lg"
						>
							Cancel
						</button>
						<button
							type="button"
							onClick={handleDelete}
							className="text-white bg-main-red px-6 py-3 w-full rounded-lg"
						>
							Delete
						</button>
					</>
				) : (
					<button
						type="button"
						onClick={handelOpenEdit}
						className="text-white bg-main-blue px-6 py-3 w-full rounded-lg mt-6"
					>
						Edit
					</button>
				)}
			</form>
		</div>
	)
}

const Schema: FC = () => {
	const { app, refetch } = useContext(Context)!
	const [updateModel] = useMutation(UPDATE_MODEL_MUTATION)
	const [updateApiSchema] = useMutation(UPDATE_API_SCHEMA_MUTATION)
	// const [createModel] = useMutation()

	const schemas = useMemo(() => {
		if (!app) return []
		return mapSchemas(app)
	}, [app])

	const handleUpdate = async (schema: ISchema) => {

		await Promise.all([
			await updateModel({
				variables: {
					input: {
						_id: schema.model._id,
						name: schema.model.name,
						fields: schema.model.fields
					},
				},
			}),
			await updateApiSchema({
				variables: {
					input: {
						modelId: schema.model._id,
						methods: schema.apiSchema?.methods,
					},
				},
			}),
		])

		refetch?.call(this)

		await Swal.fire({
			title: "Updated!",
			text: "Your app has updated.",
			icon: "success",
			confirmButtonColor: "#2680fe",
			timer: 1500,
		})
	}

	const handleCreate = async () => {
		await Promise.all([
			
		])
	}

	return (
		<div>
			<h3 className="text-xl mb-6">Schema Details</h3>

			<div className="space-y-6">
				<Input
					defaultValue="8f1ecb56c1a076125043bb17eb37da2d"
					label="Access Token"
					type="password"
					disabled
				/>

				<SidebarSchema.Create
					label={
						<div className=" bg-main-blue px-6 py-2 rounded-lg text-white">
							New Schema
						</div>
					}
				/>
				{schemas.map((schema) => (
					<div key={schema.model._id} className="flex items-center gap-x-3">
						<a
							href={apiUrl(app!.apiConfigs!.apiTypes[0].url, schema.model.name)}
							className="underline underline-offset-4 text-main-blue text-xl mr-3"
							target="_blank"
							rel="noopener noreferrer"
						>
							{schema.model.name}
						</a>
						<SidebarSchema.View
							label={
								<div className="bg-main-blue text-white text-xs px-3 py-1 rounded-full cursor-pointer hover:-translate-y-1 transition ease-in-out delay-150 hover:scale-110 duration-300">
									View
								</div>
							}
							schema={schema}
						/>

						<SidebarSchema.Edit
							label={
								<div className="bg-main-blue text-white text-xs px-3 py-1 rounded-full cursor-pointer hover:-translate-y-1 transition ease-in-out delay-150 hover:scale-110 duration-300">
									Edit
								</div>
							}
							schema={schema}
							onSubmit={handleUpdate}
						/>

						<Link href={`/apps/${app!.slug}/data`}>
							<a className="bg-main-blue text-white text-xs px-3 py-1 rounded-full cursor-pointer hover:-translate-y-1 transition ease-in-out delay-150 hover:scale-110 duration-300">
								Data
							</a>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}

const Console: NextPage<Props> = (props) => {
	const { data, loading, refetch } = useQuery<{ app: IApp }>(APP_BY_ID_QUERY, {
		variables: {
			slug: props.query.slug,
		},
	})

	if (loading) return <div>Loading</div>

	if (!data) return <div>no data</div>

	return (
		<Context.Provider value={{ app: data.app, refetch }}>
			<Navbar />
			<div className="container mt-12 py-12 flex justify-center">
				<div className="xl:w-1/2 w-full">
					<Tab
						tabs={[
							{ title: "App", body: <App /> },
							{ title: "Schema", body: <Schema /> },
						]}
					/>
				</div>
			</div>
		</Context.Provider>
	)
}

export const getServerSideProps = auth(async ({ query }) => {
	return {
		props: { query },
	}
})

export default Console
