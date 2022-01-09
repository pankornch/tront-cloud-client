import React, { FC, useCallback, useEffect, useState } from "react"
import CloseSVG from "@/public/close.svg"

type childrenContent = JSX.Element | JSX.Element[]

interface Props {
	content: childrenContent
}

interface PopupProps {
	content: childrenContent
	onClose?: () => any
	show: boolean
}

const Popup: FC<PopupProps> = (props) => {
	const [show, setShow] = useState<boolean>()
	const animateShow = useCallback(() => {
		return show ? "right-0" : "-right-full"
	}, [show])

	useEffect(() => {
		setTimeout(() => {
			setShow(props.show)
		}, 1)
	}, [props.show])

	return (
		<>
			{props.show && (
				<div
					className="w-screen h-screen bg-black opacity-25 fixed top-0 right-0 z-30"
					onClick={props.onClose}
				></div>
			)}
			{props.show && (
				<div
					className={`transition-all duration-300 w-screen md:w-128 h-screen fixed top-0 ${animateShow()} z-40 pt-24 p-6 shadow-lg bg-white overflow-auto`}
				>
					<div
						onClick={props.onClose}
						className="bg-main-red text-white p-2 w-fit rounded-full cursor-pointer absolute top-24 right-6"
					>
						<CloseSVG className="w-3" />
					</div>
					{props.content}
				</div>
			)}
		</>
	)
}

interface SidebarButtonProps extends Props {
	label: JSX.Element
	initialOpen?: boolean
	onClose?: () => void
	handleClose?: (close: () => void) => void
}

const SidebarButton: FC<SidebarButtonProps> = (props) => {
	const [open, setOpen] = useState<boolean>(props.initialOpen || false)

	const handleToggle = () => setOpen((prev) => !prev)

	useEffect(() => {
		if (!open) props.onClose?.call(this)
	}, [open])

	useEffect(() => {
		props.handleClose?.call(this, () => {
			setOpen(false)
		})
	}, [props.handleClose])

	return (
		<div>
			<button type="button" onClick={handleToggle}>
				{props.label}
			</button>

			<Popup
				content={props.content}
				onClose={() => setOpen(false)}
				show={open}
			/>
		</div>
	)
}

class Sidebar {
	Popup(props: PopupProps) {
		return <Popup {...props} />
	}
	Button(props: SidebarButtonProps) {
		return <SidebarButton {...props} />
	}
}

export default new Sidebar()
