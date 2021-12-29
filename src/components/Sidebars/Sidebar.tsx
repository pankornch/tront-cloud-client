import React, { FC, useState } from "react"
import CloseSVG from "@/public/close.svg"

type childrenContent = JSX.Element | JSX.Element[]

interface Props {
	content: childrenContent
}

interface PopupProps {
	content: childrenContent
	onClose?: () => any
}

const Popup: FC<PopupProps> = (props) => {
	return (
		<div className="w-screen md:w-128 h-screen fixed top-0 right-0 z-40 pt-24 p-6 shadow-lg bg-white overflow-auto">
			<div
				onClick={() => props.onClose?.call(this)}
				className="bg-main-red text-white p-2 w-fit rounded-full cursor-pointer absolute top-24 right-6"
			>
				<CloseSVG className="w-3" />
			</div>
			{props.content}
		</div>
	)
}

const Sidebar: FC<Props> = (props) => {
	return <Popup content={props.content} />
}

interface SidebarButtonProps extends Props {
	label: (open: () => void) => childrenContent | string
	initialOpen?: boolean
}

const SidebarButton: FC<SidebarButtonProps> = (props) => {
	const [open, setOpen] = useState<boolean>(false)

	const handleToggle = () => setOpen((prev) => !prev)

	return (
		<div>
			{props.label?.call(this, handleToggle)}
			{open && <Popup content={props.content} onClose={() => setOpen(false)} />}
		</div>
	)
}

export { SidebarButton }

export default Sidebar
