import type { NextPage } from "next"
import LogoSVG from "@/public/logo.svg"
import HambugerSVG from "@/public/hamburger.svg"
import CloseSVG from "@/public/close.svg"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Input from "@/src/components/Forms/Input"
import Checkbox from "@/src/components/Forms/Checkbox"
import Select from "@/src/components/Forms/Select"
import { dataTypes } from "@/src/utils/constants"
import useApiSchema from "@/src/hooks/useApiSchema"
import { RefreshIcon } from "@heroicons/react/outline"
import Table from "@/src/components/Table"

const Home: NextPage = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { apiSchema, getApiMethodColor } = useApiSchema({
		model: { name: "Books" },
	})

	const [selectData, setSelectData] = useState<string>("Table")
	return (
		<div>
			{/* Navbar */}
			<nav className="fixed top-0 right-0 w-screen container flex justify-between items-center py-5 shadow-md bg-white z-50">
				<div className="flex items-center space-x-20">
					<LogoSVG className="h-10" />
				</div>
				<div className="hidden lg:flex space-x-7 items-center text-main-blue ">
					<div className="hidden lg:block">Features</div>
					<Link href="/login">
						<a className="text-main-blue px-4 py-2 rounded-md cursor-pointer">
							Log in
						</a>
					</Link>
					<Link href="/signup">
						<a className="bg-main-blue text-white px-4 py-2 rounded-md cursor-pointer">
							Sign up
						</a>
					</Link>
				</div>
				<div className="lg:hidden block">
					{isOpen ? (
						<CloseSVG className="h-4" onClick={() => setIsOpen(false)} />
					) : (
						<HambugerSVG className="h-4" onClick={() => setIsOpen(true)} />
					)}
				</div>
			</nav>
			<div className="block lg:hidden">
				{isOpen && (
					<div className="container flex flex-col space-y-6 fixed top-0 right-0 w-screen pt-28 pb-5 h-screen bg-white z-40">
						<Link href="/login">
							<a className="text-main-blue px-4 py-2 rounded-md cursor-pointer">
								Log in
							</a>
						</Link>
						<Link href="/signup">
							<a className="bg-main-blue text-white px-4 py-2 rounded-md cursor-pointer">
								Sign up
							</a>
						</Link>
					</div>
				)}
			</div>
			{/* Content */}
			<div className="container pt-20 bg-gradient-to-b from-main-blue-light/50 min-h-screen flex flex-col items-center gap-y-12">
				<div className="flex flex-col items-center text-main-blue gap-y-3 pt-12 text-center">
					<h1 className="text-4xl md:text-6xl">The easy way to get your own</h1>
					<h1 className="text-4xl md:text-6xl underline decoration-main-green underline-offset-8">
						RESTFUL API
					</h1>
				</div>

				<h6 className="text-center">
					Tront is website that helps you to get you own RESTful API by simple
					config.
				</h6>

				<div className="relative w-4/5 h-52">
					<Image
						src="/img-content.png"
						layout="fill"
						alt=""
						objectFit="cover"
						unoptimized
					/>
				</div>

				<Link href="/signup">
					<a className="bg-main-blue text-white px-5 py-2 rounded-md text-lg">
						Get Started
					</a>
				</Link>

				<div className="flex flex-col w-full">
					{/* begin */}

					<div className="w-full grid grid-cols-2 h-12 relative">
						<div className="absolute -top-1 left-px sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-main-blue"></div>
						<div className="h-full w-1 bg-main-blue absolute top-0 left-0 sm:left-1/2 sm:-translate-x-1/2"></div>
					</div>

					{/* App */}
					<div className="w-full grid grid-cols-1 sm:grid-cols-2 relative gap-y-12 sm:gap-0 py-6 sm:py-12">
						<div className="absolute top-20 sm:top-1/2 -translate-y-1/2 left-px sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-main-blue"></div>
						<div className="h-full w-1 bg-main-blue absolute top-0 left-0 sm:left-1/2 sm:-translate-x-1/2"></div>
						<div className="h-32 w-11/12 sm:w-96 justify-self-end sm:mr-12">
							<div className="bg-white border shadow-md rounded-lg select-none p-4 flex flex-col gap-y-3 hover:shadow-lg">
								<div className="flex justify-between">
									<div className="text-lg font-medium truncate">
										Lorem ipsum dolor sit
									</div>
									<div>22/02/2022</div>
								</div>
								<div className="flex gap-x-3">
									<span>REST:</span>
									<input
										className="grow px-1"
										defaultValue="https://tront.netlify.app/api/rest/lorem-ipsum/"
										readOnly
									/>
								</div>
								<div className="flex gap-x-3 mt-2">
									<button
										type="button"
										className="bg-main-blue px-2 py-1 text-white rounded-md"
									>
										Open App
									</button>
									<button
										type="button"
										className="bg-main-green px-2 py-1 text-white rounded-md"
									>
										Data
									</button>
								</div>
							</div>
						</div>
						<div className="min-h-[8rem] w-11/12 sm:w-96 bg-white shadow-md justify-self-end sm:justify-self-start sm:ml-12 px-4 py-2 rounded-lg hover:shadow-lg">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
						</div>
					</div>

					{/* Create App */}
					<div className="w-full grid grid-cols-1 sm:grid-cols-2 relative gap-y-12 sm:gap-0 py-6 sm:py-12">
						<div className="absolute top-20 sm:top-1/2 -translate-y-1/2 left-px sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-main-blue"></div>
						<div className="h-full w-1 bg-main-blue absolute top-0 left-0 sm:left-1/2 sm:-translate-x-1/2"></div>
						<div className="w-11/12 sm:w-96 justify-self-end sm:mr-12">
							<div className="bg-white border shadow-md rounded-lg select-none p-4 flex flex-col gap-y-3 hover:shadow-lg">
								<div className="text-center font-semibold text-lg">
									Create App
								</div>
								<Input
									label="App name"
									defaultValue="Lorem ipsum dolor sit"
									required
									readOnly
								/>
								<Input
									label="Description"
									defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
									readOnly
								/>
								<Input
									label="Slug"
									defaultValue="lorem-ipsum-dolor"
									required
									readOnly
								/>
								<div className="flex gap-x-3 mb-3">
									<span>API: </span>
									<input
										className="grow px-1"
										defaultValue="https://tront.netlify.com/api/rest/lorem-ipsum-dolor"
										readOnly
									/>
								</div>
							</div>
						</div>
						<div className="min-h-[8rem] h-fit w-11/12 sm:w-96 bg-white shadow-md justify-self-end sm:justify-self-start sm:ml-12 px-4 py-2 rounded-lg hover:shadow-lg">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
						</div>
					</div>

					{/* Create Schema */}
					<div className="w-full grid grid-cols-1 sm:grid-cols-2 relative gap-y-12 sm:gap-0 py-6 sm:py-12">
						<div className="absolute top-20 sm:top-1/2 -translate-y-1/2 left-px sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-main-blue"></div>
						<div className="h-full w-1 bg-main-blue absolute top-0 left-0 sm:left-1/2 sm:-translate-x-1/2"></div>
						<div className="w-11/12 sm:w-96 justify-self-end sm:mr-12">
							<div className="bg-white border shadow-md rounded-lg select-none p-4 flex flex-col gap-y-3 hover:shadow-lg">
								<div className="text-center font-semibold text-lg">
									Create Schema
								</div>
								<Input
									label="Model name"
									defaultValue="Books"
									readOnly
									required
								/>
								<div className="grid grid-cols-10 items-center">
									<div className="col-span-3 text-sm">Field name</div>
									<div className="col-span-3 text-sm">Type</div>
									<div className="col-span-3 text-sm">Default value</div>
									<div className="col-span-1 text-sm truncate">Required</div>
								</div>
								<div className="grid grid-cols-10 items-center justify-items-center gap-x-2">
									<Input
										defaultValue="_id"
										readOnly
										className="col-span-3 text-sm"
									/>
									<Select options={dataTypes} className="col-span-3 text-sm" />
									<Input
										defaultValue=""
										readOnly
										className="col-span-3 text-sm"
									/>
									<Checkbox checked disabled />
								</div>
								<div className="grid grid-cols-10 items-center justify-items-center gap-x-2">
									<Input
										defaultValue="title"
										readOnly
										className="col-span-3 text-sm"
									/>
									<Select
										options={dataTypes}
										defaultValue={"STRING"}
										className="col-span-3 text-sm"
									/>
									<Input
										defaultValue=""
										readOnly
										className="col-span-3 text-sm"
									/>
									<Checkbox checked disabled />
								</div>
								<div className="grid grid-cols-10 items-center justify-items-center gap-x-2">
									<Input
										defaultValue="author_name"
										readOnly
										className="col-span-3 text-sm"
									/>
									<Select
										options={dataTypes}
										defaultValue={"STRING"}
										className="col-span-3 text-sm"
									/>
									<Input
										defaultValue=""
										readOnly
										className="col-span-3 text-sm"
									/>
									<Checkbox checked disabled />
								</div>
								<div className="mt-3">API</div>
								<div className="flex gap-x-3">
									<div className="text-sm">Active</div>
									<div className="text-sm">Method</div>
									<div className="text-sm ml-12">Endpoint</div>
								</div>
								<div className="space-y-2">
									{apiSchema.methods.map((m) => (
										<div key={m.name} className="flex gap-x-3">
											{m.name == "PUT" ? (
												<div className="bg-gray-300 text-black text-xs px-2 w-fit rounded-full flex items-center mr-4">
													off
												</div>
											) : (
												<div className="bg-main-green text-white text-xs px-2 w-fit rounded-full flex items-center mr-4">
													on
												</div>
											)}
											<div
												className={`${getApiMethodColor(
													m.name
												)} font-medium w-20`}
											>
												{m.name.startsWith("GET") ? "GET" : m.name}
											</div>
											<div className="ml-4">{m.pathname}</div>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="min-h-[8rem] h-fit w-11/12 sm:w-96 bg-white shadow-md justify-self-end sm:justify-self-start sm:ml-12 px-4 py-2 rounded-lg hover:shadow-lg">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
						</div>
					</div>

					{/* Member */}
					<div className="w-full grid grid-cols-1 sm:grid-cols-2 relative gap-y-12 sm:gap-0 py-6 sm:py-12">
						<div className="absolute top-20 sm:top-1/2 -translate-y-1/2 left-px sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-main-blue"></div>
						<div className="h-full w-1 bg-main-blue absolute top-0 left-0 sm:left-1/2 sm:-translate-x-1/2"></div>
						<div className="w-11/12 sm:w-96 justify-self-end sm:mr-12">
							<div className="bg-white border shadow-md rounded-lg select-none p-4 flex flex-col gap-y-3 hover:shadow-lg">
								<div className="text-lg font-semibold text-center">
									Invite your team
								</div>
								<Input
									label="Email"
									defaultValue="peter-parker@email.com"
									required
									readOnly
								/>
								<div className="text-gray-400 text-xs">
									* Members can create, update, and delete schema in this app
								</div>
								<div>Members (2)</div>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-x-3">
											<Image
												src="https://avatars.dicebear.com/api/identicon/john.svg"
												loader={({ src }) => src}
												width={24}
												height={24}
												alt=""
												unoptimized
											/>
											<div>john-doe@gmail.com</div>
										</div>
										<div>OWNER</div>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-x-3">
											<Image
												src="https://avatars.dicebear.com/api/identicon/bob.svg"
												loader={({ src }) => src}
												width={24}
												height={24}
												alt=""
												unoptimized
											/>
											<div>bob-smith@gmail.com</div>
										</div>
										<div>MEMBER</div>
									</div>
								</div>
							</div>
						</div>
						<div className="min-h-[8rem] h-fit w-11/12 sm:w-96 bg-white shadow-md justify-self-end sm:justify-self-start sm:ml-12 px-4 py-2 rounded-lg hover:shadow-lg">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
						</div>
					</div>

					{/* Data Playground */}
					<div className="w-full grid grid-cols-1 sm:grid-cols-2 relative gap-y-12 sm:gap-0 py-6 sm:py-12">
						<div className="absolute top-20 sm:top-1/2 -translate-y-1/2 left-px sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-main-blue"></div>
						<div className="h-full w-1 bg-main-blue absolute top-0 left-0 sm:left-1/2 sm:-translate-x-1/2"></div>
						<div className="w-11/12 sm:w-96 justify-self-end sm:mr-12">
							<div className="bg-white border shadow-md rounded-lg select-none p-4 flex flex-col gap-y-4 hover:shadow-lg">
								<div className="text-lg font-semibold text-center">Data</div>
								<div className="flex items-center gap-x-3">
									<div className="font-medium">API</div>
									<Select options={["Books"]} />
									<div className="text-xs bg-main-blue text-white rounded-full px-2 py-1">
										View
									</div>
									<div className="text-xs bg-main-blue text-white rounded-full px-2 py-1">
										Console
									</div>
								</div>

								<Input defaultValue="https://tront.netlify.com/api/rest/lorem-ipsum-dolor/Books" readOnly />
								<div className="flex items-end justify-between">
									<div className="flex gap-3">
										<Select
											options={["Table", "JSON"]}
											className="w-24"
											label="Data"
											value={selectData}
											onChangeValue={setSelectData}
										/>
										<Select
											options={[10, 50, 100]}
											className="w-24"
											label="Limit"
										/>
									</div>
									<div className="mb-2 flex gap-x-3">
										<div className="bg-main-blue px-2 py-1 w-fit rounded-lg text-white">
											<RefreshIcon className="w-4" />
										</div>
										<div className="bg-main-blue px-2 py-1 w-fit rounded-lg text-xs text-white">
											Insert
										</div>
									</div>
								</div>
								<div className="w-full overflow-x-scroll shadow-lg rounded-lg overflow-hidden">
									{selectData === "Table" ? (
										<Table
											keys={["_id", "title", "author_name"]}
											data={[
												{
													_id: "622108",
													title: "Python",
													author_name: "John Doe",
												},
												{
													_id: "622107",
													title: "Java",
													author_name: "Bob Smith",
												},
											]}
										/>
									) : (
										<pre className="h-36 overflow-y-auto p-6 border-2 border-gray-300 rounded-lg shadow-md text-xs">
											{JSON.stringify(
												[
													{
														_id: "622108",
														title: "Python",
														author_name: "John Doe",
													},
													{
														_id: "622107",
														title: "Java",
														author_name: "Bob Smith",
													},
												],
												null,
												2
											)}
										</pre>
									)}
								</div>
							</div>
						</div>
						<div className="min-h-[8rem] h-fit w-11/12 sm:w-96 bg-white shadow-md justify-self-end sm:justify-self-start sm:ml-12 px-4 py-2 rounded-lg hover:shadow-lg">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
						</div>
					</div>

					{/* tail */}

					<div className="w-full grid grid-cols-2 h-12 relative">
						<div className="absolute -bottom-1 left-px sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-main-blue"></div>
						<div className="h-full w-1 bg-main-blue absolute top-0 left-0 sm:left-1/2 sm:-translate-x-1/2"></div>
					</div>
				</div>

				<h4 className="font-medium">Supported APIs</h4>

				<div>
					<div className="border rounded-lg px-12 py-6 text-xl shadow-sm hover:shadow-md select-none bg-white">
						&#123; REST &#125;
					</div>
				</div>

				{/* Footer */}
				<footer className="py-12 flex flex-col sm:flex-row gap-y-3 justify-between items-center w-full">
					<LogoSVG className="h-10" />
					<div>&#169; 2021 - 2022 Tront. All rights reserved</div>
				</footer>
			</div>
		</div>
	)
}

export default Home
