import Navbar from "@/src/components/Navbar"
import { ACTION_INVITE_MUTATION, APPS_QUERY, useGetAppInvite } from "@/src/gql"
import auth from "@/src/middlewares/auth"
import { IApp } from "@/src/types"
import { useMutation, useQuery } from "@apollo/client"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useMemo, useState } from "react"
import Image from "next/image"
import { BellIcon } from "@heroicons/react/outline"
import {
	CheckCircleIcon,
	XCircleIcon,
	ChevronDownIcon,
} from "@heroicons/react/solid"
import Toast from "@/src/components/Toast"
import LoadingOverLay from "@/src/components/Loading/LoadingOverlay"
import { LoadingLayout } from "@/src/components/Loading/LoadingLayout"
import Auth from "@/src/middlewares/AuthHOC"

const Index: NextPage = () => {
	const router = useRouter()
	const {
		data,
		loading,
		refetch: appRefetch,
	} = useQuery<{ apps: IApp[] }>(APPS_QUERY, {
		fetchPolicy: "network-only",
	})

	const appInvites = useGetAppInvite()
	const [actionInvite] = useMutation(ACTION_INVITE_MUTATION)

	const getApiUrl = (url: string) => {
		const $url = `${location.protocol}//${location.host}`
		return url.replace(process.env.NEXT_PUBLIC_BASE_URL_API!, $url)
	}

	const dateFormat = (date: string) => {
		// dd/mm/yyyy
		const _d = new Date(date)
		const prefix = (n: number) => (n < 10 ? "0" + n : n)
		return `${prefix(_d.getDate())}/${prefix(
			_d.getMonth() + 1
		)}/${_d.getFullYear()}`
	}

	const [isShowMore, setIsShowMore] = useState<boolean>(false)

	const inviteItems = useMemo(() => {
		if (!appInvites.data) return []
		if (isShowMore) return appInvites.data
		return appInvites.data?.slice(0, 2)
	}, [appInvites.data, isShowMore])

	const handleActoinInvite = async (app: IApp, status: boolean) => {
		const close = LoadingOverLay()
		await actionInvite({
			variables: {
				input: {
					appId: app._id,
					status: status,
				},
			},
		})

		Toast({ type: "SUCCESS", title: "Invite accepted" })

		await Promise.all([appRefetch(), appInvites.refetch()])

		close()
	}

	return (
		<div>
			<Navbar />

			{/* Content */}
			<LoadingLayout isLoading={loading}>
				<div className="container mt-20 py-12">
					{/* Invite */}
					{inviteItems.length ? (
						<details className="mb-6 w-full sm:w-96 relative select-none group">
							<summary className="flex items-center justify-between font-medium px-4 py-2 ring ring-main-blue outline-none rounded-lg cursor-pointer">
								<div className="flex space-x-2 items-center">
									<div className="relative">
										<span className="flex h-3 w-3 absolute top-0 right-0">
											<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-main-red/75 opacity-75"></span>
											<span className="relative inline-flex rounded-full h-3 w-3 bg-main-red"></span>
										</span>
										<BellIcon className="w-8" />
									</div>
									<span>
										You have {appInvites.data?.length} pending app invitation
									</span>
								</div>
								<ChevronDownIcon className="w-6 group-open:-rotate-180 transition-all" />
							</summary>

							<div className="mt-4 space-y-6 shadow-md p-3 rounded-lg ring ring-gray-200 absolute bg-white w-full">
								{inviteItems.map((invite) => (
									<div
										key={invite._id}
										className="flex items-center w-full space-x-6"
									>
										<Image
											src={invite.user.avatar}
											width={28}
											height={28}
											unoptimized
											alt=""
										/>
										<div className="flex grow justify-between">
											<div>
												<div className="flex">
													<div className="font-medium w-20 sm:w-28 truncate mr-2">
														{invite.user.email}
													</div>
													<span>invited</span>
												</div>
												<div className="truncate w-36 sm:w-44">
													{invite.name}
												</div>
											</div>
											<div className="flex items-end space-x-3">
												<button
													onClick={() => handleActoinInvite(invite, true)}
													type="button"
													className="flex flex-col items-center text-main-green hover:text-main-green/75"
												>
													<CheckCircleIcon className="w-8" />
													<span className="text-xs">Accept</span>
												</button>
												<button
													onClick={() => handleActoinInvite(invite, false)}
													type="button"
													className="flex flex-col items-center text-main-red hover:text-main-red/75"
												>
													<XCircleIcon className="w-8" />
													<span className="text-xs">Decline</span>
												</button>
											</div>
										</div>
									</div>
								))}
								<button
									type="button"
									className="flex items-center justify-center w-full space-x-1 text-gray-500"
								>
									<ChevronDownIcon
										className={`w-5 ${
											isShowMore ? "-rotate-180" : ""
										} transition-all`}
									/>

									<div
										className="text-sm"
										onClick={() => setIsShowMore((prev) => !prev)}
									>
										{isShowMore ? "show less" : "show more"}
									</div>
								</button>
							</div>
						</details>
					) : (
						<></>
					)}

					{/* nav */}
					<div className="flex justify-between items-center">
						<div className="text-xl">Apps</div>
						<Link href="/apps/create">
							<a className="bg-main-blue text-white px-3 py-2 cursor-pointer rounded-lg hover:scale-110 transition-all">
								Create App
							</a>
						</Link>
					</div>

					{/* apps */}

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
						{data?.apps.map((app) => (
							<div
								key={app._id}
								className="shadow-lg rounded-lg px-6 py-4 border border-gray-100 hover:ring hover:ring-main-blue-light hover:scale-105 transition-all"
							>
								<div className="flex justify-between items-center">
									<div className="text-xl font-semibold">{app.name}</div>

									<span className="text-xs">
										{dateFormat(app.createdAt as string)}
									</span>
									{/* <div className="text-main-green text-lg">
									{getStatus(app.active!)}
								</div> */}
								</div>
								<div>
									<span className="font-semibold mt-2">Slug: </span>
									<span>{app.slug}</span>
								</div>
								{app?.apiConfigs?.apiTypes?.map((api) => (
									<div key={api.type} className="text-sm my-3 flex">
										<span className="font-medium mr-2">{api.type}:</span>
										<input
											type="text"
											defaultValue={getApiUrl(api.url!)}
											className="px-2 w-full"
											readOnly
										/>
									</div>
								))}

								{/* <span className="text-xs">
								{dateFormat(app.createdAt as string)}
							</span> */}
								<div className="flex space-x-3">
									<button
										onClick={() => router.push(`/apps/${app.slug}/console`)}
										className="bg-main-blue text-white px-3 py-1 rounded-md w-fit mt-3 hover:scale-110 transition-all"
									>
										Open App
									</button>
									<button
										onClick={() => router.push(`/apps/${app.slug}/data`)}
										className="bg-main-green text-white px-3 py-1 rounded-md w-fit mt-3 hover:scale-110 transition-all"
									>
										Data
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</LoadingLayout>
		</div>
	)
}

// export const getServerSideProps = auth(async () => {
// 	return {
// 		props: {},
// 	}
// })
export default Auth(Index)
