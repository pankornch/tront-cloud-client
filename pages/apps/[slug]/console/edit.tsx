import React from "react"
import Checkbox from "@/src/components/Checkbox"
import Input from "@/src/components/Input"
import Navbar from "@/src/components/Navbar"
import SidebarModel from "@/src/components/Sidebars/SidebarModel"
import { NextPage } from "next"

import SidebarAPI from "@/src/components/Sidebars/SidebarAPI"
import { useRecoilValue } from "recoil"
import { MODELS_STATE } from "@/src/store/states"

const EditApp: NextPage = () => {
	const modelsState = useRecoilValue(MODELS_STATE)

	return (
		<div>
			<Navbar />
			{/* Content */}
			<div className="container mt-20 py-12 w-full xl:w-1/2 space-y-6">
				<div className="space-y-6">
					<Input defaultValue="Lorem ipsum dolor" label="App name" />
					<Input defaultValue="Lorem ipsum dolor" label="Description" />
				</div>

				<div>
					<div>Models</div>
					<div className="ml-3 space-y-3 mt-3">
						{modelsState.map((e, i) => (
							<SidebarModel
								key={i}
								title={`${e.name} Model`}
								label={(open) => (
									<strong
										className="w-fit cursor-pointer underline underline-offset-4 text-main-blue "
										onClick={open}
									>
										{e.name}
									</strong>
								)}
								model={e}
							/>
						))}
					</div>
				</div>

				<div>
					<div className="flex space-x-3">
						<div>APIs</div>
						<SidebarAPI _id="5398764f6f23" />
					</div>
					<div className="space-x-3 ml-3 flex mt-3">
						<Checkbox label="REST:" checked={true} />
						<input
							defaultValue="https://tront.com/apps/lorem-ipsum-dolor/api/rest"
							className="w-full px-3"
						/>
					</div>
				</div>

				<div>
					<Input
						defaultValue="8f1ecb56c1a076125043bb17eb37da2d"
						label="Access Token"
						type="password"
						disabled
					/>
				</div>

				<div className="space-y-3">
					<button
						type="button"
						className="bg-main-blue w-full py-2 text-white rounded-lg"
					>
						Save
					</button>
					<button
						type="button"
						className="bg-gray-400 w-full py-2 text-white rounded-lg"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}

export default EditApp
