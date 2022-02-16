import React, { FC, useCallback, useMemo, useState } from "react"

interface Props {
	tabs: ITab[]
}

interface ITab {
	title: JSX.Element | string
	body: JSX.Element
}

const Tab: FC<Props> = (props) => {
	const [currentTab, setCurrentTab] = useState<number>(0)

	const renderTab = useMemo(() => {
		return props.tabs[currentTab].body
	}, [currentTab, props.tabs])

	const handelChangeTab = (index: number) => {
		setCurrentTab(index)
	}

	const NavClass = useCallback(
		(index: number) => {
			return `
				-mb-px text-md rounded-t-lg py-4 px-8 font-medium text-center 
				${
					currentTab === index
						? "border-main-blue text-main-blue"
						: "text-gray-300 hover:text-main-dark hover:border-gray-400"
				} 
				border-b-2 transition-all
			`
		},
		[currentTab]
	)

	return (
		<div>
			<div className="flex gap-x-3 border-b mb-6 justify-center">
				{props.tabs.map((e, i) => (
					<button
						onClick={() => handelChangeTab(i)}
						key={i}
						className={NavClass(i)}
					>
						{e.title}
					</button>
				))}
			</div>

			{renderTab}
		</div>
	)
}

export default Tab
