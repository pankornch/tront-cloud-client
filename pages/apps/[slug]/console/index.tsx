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
	useLazyQuery,
	useMutation,
	useQuery,
} from "@apollo/client"
import {
	APP_BY_ID_QUERY,
	DELETE_APP_MUTATION,
	CREATE_SCHEMA_MUTATION,
	UPDATE_APP_MUTATIION,
	UPDATE_SCHEMA_MUTATION,
	DELETE_SCHEMA_MUTATION,
	SEARCH_USER_QUERY,
	SEND_INVITE_MUTATION,
	useGetMembersByApp,
} from "@/src/gql"
import { IApp, IMember, IUser } from "@/src/types"
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
import Image from "next/image"
import { useSession } from "next-auth/react"
import Toast from "@/src/components/Toast"
import useComponentClickOutside from "@/src/hooks/useComponentClickOutside"
import LoadingSVG from "@/public/loading.svg"
import { LoadingLayout } from "@/src/components/Loading/LoadingLayout"

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

	const session = useSession()

	const isOwner = useMemo(() => {
		if (session.data?.user._id !== app?.user._id) return false
		return true
	}, [app, session])

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

				<div className="flex gap-x-2">
					<div>API endpoint:</div>
					<input
						className="grow px-2"
						defaultValue={apiUrl(app?.apiConfigs.apiTypes[0].url!)}
						readOnly
					/>
				</div>

				{isOwner && (
					<>
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
					</>
				)}
			</form>
		</div>
	)
}

const Schema: FC = () => {
	const { app, refetch } = useContext(Context)
	const [createSchema] = useMutation(CREATE_SCHEMA_MUTATION)
	const [updateSchema] = useMutation(UPDATE_SCHEMA_MUTATION)
	const [deleteSchema] = useMutation(DELETE_SCHEMA_MUTATION)

	const schemas = useMemo(() => {
		if (!app) return []
		return mapSchemas(app)
	}, [app])

	const handleUpdate = async (schema: ISchema) => {
		await updateSchema({
			variables: {
				input: {
					model: schema.model,
					apiSchema: schema.apiSchema,
					appId: app!._id,
				},
			},
		})

		refetch?.call(this)

		await Swal.fire({
			title: "Updated!",
			text: "Your app has updated.",
			icon: "success",
			confirmButtonColor: "#2680fe",
			timer: 1500,
		})
	}

	const handleCreate = async (schema: ISchema) => {
		await createSchema({
			variables: {
				input: {
					model: schema.model,
					apiSchema: schema.apiSchema,
					appId: app!._id,
				},
			},
		})
		refetch?.call(this)
		await Swal.fire({
			title: "Created!",
			text: "Your schema has created.",
			icon: "success",
			confirmButtonColor: "#2680fe",
			timer: 1500,
		})
	}

	const handleDelete = async (id: String) => {
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
			await deleteSchema({
				variables: {
					input: {
						modelId: id,
						appId: app!._id,
					},
				},
			})

			refetch?.call(this)

			Swal.fire({
				title: "Deleted!",
				text: "Your app has been deleted.",
				icon: "success",
				confirmButtonColor: "#2680fe",
				timer: 1500,
			})
		}
	}

	const modelNames = useMemo(() => {
		if (!app) return []
		return app.modelConfigs.models.map((e) => e.name)
	}, [app])

	return (
		<div>
			<h3 className="text-xl mb-6">Schema Details</h3>

			<div className="space-y-6">
				{/* <Input
					defaultValue="8f1ecb56c1a076125043bb17eb37da2d"
					label="Access Token"
					type="password"
					disabled
				/> */}

				<SidebarSchema.Create
					label={
						<div className=" bg-main-blue px-6 py-2 rounded-lg text-white">
							New Schema
						</div>
					}
					onSubmit={handleCreate}
					modelNames={modelNames}
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
							onDelete={handleDelete}
						/>

						<Link href={`/apps/${app!.slug}/data?model=${schema.model.name}`}>
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

interface MemberProps {
	user: Partial<IUser>
	isMe: boolean
	member?: Partial<IMember>
}
const MemberCard: FC<MemberProps> = (props) => {
	const { app } = useContext(Context)
	const [sendInvite] = useMutation(SEND_INVITE_MUTATION)
	const [isSend, setIsSend] = useState<boolean>(false)

	const handelSendInvite = async () => {
		setIsSend(true)
		await sendInvite({
			variables: {
				input: {
					email: props.user.email,
					appId: app!._id,
				},
			},
		})

		await Toast({
			type: "SUCCESS",
			title: "Invited",
			body: `${props.user.email} has invited`,
		})
	}

	return (
		<div className="flex items-center justify-between hover:bg-gray-100 hover:shadow-md p-2 rounded-sm">
			<div className="flex items-center gap-3 relative">
				<Image
					src={props.user.avatar || ""}
					width={24}
					height={24}
					objectFit="cover"
					loader={({ src }) => src}
					unoptimized
					alt=""
				/>
				<div>{props.user.email}</div>
			</div>
			{!props.isMe && !props.member && (
				<button
					onClick={handelSendInvite}
					type="button"
					className="bg-main-blue text-white rounded-md px-2 py-1 text-sm disabled:bg-gray-400"
					disabled={isSend}
				>
					Send invite
				</button>
			)}
		</div>
	)
}

const Members: FC = () => {
	const { app } = useContext(Context)
	const [searchEmail, setSearchEmail] = useState<string>("")
	const [fetechSearch, { loading, data }] =
		useLazyQuery<{ searchUser: IUser[] }>(SEARCH_USER_QUERY)
	// const members = useGetMembersByApp({
	// 	variables: { input: { appId: app!._id } },
	// })

	const members = app!.members

	const [show, setShow] = useState<boolean>(false)

	const { ref } = useComponentClickOutside(false, () => {
		setShow(false)
	})

	const showSearchResult = useMemo(() => {
		if (!searchEmail) return false
		setShow(true)
		fetechSearch({
			variables: {
				input: { email: searchEmail },
			},
		})
		return true
	}, [searchEmail])

	const session = useSession()

	return (
		<div>
			<h3 className="text-xl mb-6">Invite your team member</h3>
			<div className="relative">
				<Input
					label="Email"
					placeholder="Seach by email in tront account"
					onChangeValue={setSearchEmail}
					onClick={() => {
						if (searchEmail) {
							setShow(true)
						}
					}}
				/>
				<div className="text-sm text-gray-400 mt-1">
					* Members can create, update, and delete schema in this app
				</div>
				{showSearchResult && show && (
					<div
						ref={ref}
						className="absolute top-20 left-0 bg-white z-50 w-full rounded-lg p-2 shadow-lg space-y-2"
					>
						{loading && (
							<div className="flex justify-center">
								<LoadingSVG className="w-12 h-12 animate-spin text-main-blue" />
							</div>
						)}
						{!loading &&
							data?.searchUser?.map((u) => (
								<div key={u._id}>
									<MemberCard
										user={u}
										isMe={u._id == session.data?.user._id}
										member={members?.find((m) => m.user._id === u._id)}
									/>
								</div>
							))}
						{!loading && !data?.searchUser?.length && <>No user found</>}
					</div>
				)}
			</div>

			<>
				<div className="mt-6">Members ({members?.length})</div>
				<div className="ml-3 mt-3 space-y-4">
					{members?.map((member) => (
						<div
							key={member._id}
							className={`flex items-center justify-between ${
								member.status ? "text-black" : "text-gray-400"
							}`}
						>
							<div className="flex items-center gap-3">
								<Image
									src={member.user.avatar || ""}
									width={24}
									height={24}
									objectFit="cover"
									loader={({ src }) => src}
									unoptimized
									alt=""
								/>
								<div>{member.user.email}</div>
							</div>
							<div>
								{!member.status && <>Invited to </>}
								<span>{member.role}</span>
							</div>
						</div>
					))}
				</div>
			</>
		</div>
	)
}

const Console: NextPage<Props> = (props) => {
	const { data, loading, refetch } = useQuery<{ app: IApp }>(APP_BY_ID_QUERY, {
		variables: {
			slug: props.query.slug,
		},
	})

	return (
		<>
			<Navbar />

			<LoadingLayout
				isLoading={loading}
				isEmpty={!data}
				emptyContent={
					<div className="w-screen h-screen flex flex-col justify-center items-center">
						<h3 className="">No App found!</h3>
						<Link href="/apps">
							<a className="mt-3 text-xl text-main-blue underline">
								Back to apps
							</a>
						</Link>
					</div>
				}
			>
				<Context.Provider value={{ app: data?.app, refetch }}>
					<div className="container mt-12 py-12 flex justify-center">
						<div className="xl:w-1/2 w-full">
							<Tab
								tabs={[
									{ title: "App", body: <App /> },
									{ title: "Schema", body: <Schema /> },
									{ title: "Members", body: <Members /> },
								]}
							/>
						</div>
					</div>
				</Context.Provider>
			</LoadingLayout>
		</>
	)
}

export const getServerSideProps = auth(async ({ query }) => {
	return {
		props: { query },
	}
})

export default Console
