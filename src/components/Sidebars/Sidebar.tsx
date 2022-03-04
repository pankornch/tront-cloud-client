import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import CloseSVG from "@/public/close.svg"
import { createPortal } from "react-dom"

type childrenContent = JSX.Element | JSX.Element[]

interface Props {
	children: childrenContent
}

interface PopupProps extends Props {
	onClose?: () => any
	show: boolean
}

const Popup: FC<PopupProps> = (props) => {
	const [mounted, setMounted] = useState<boolean>(false)
	const [show, setShow] = useState<boolean>()
	const [shouldClose, setShouldClose] = useState<boolean>(true)
	const animateShow = useMemo(() => {
		return show ? "right-0" : "-right-full"
	}, [show])

	useEffect(() => {
		setMounted(true)

		setTimeout(() => {
			setShow(props.show)
		}, 1)

		if (!props.show) {
			setTimeout(() => {
				setShouldClose(true)
			}, 250)
		} else {
			setShouldClose(false)
		}

		return () => {
			setMounted(false)
		}

	}, [props.show])

	return mounted
		? createPortal(
				<>
					{!shouldClose && (
						<div
							className="w-screen h-screen bg-black opacity-25 fixed top-0 right-0 z-30"
							onClick={props.onClose}
						></div>
					)}

					{!shouldClose && (
						<div
							className={`transition-all duration-300 w-screen md:w-[40rem] h-screen fixed top-0 ${animateShow} z-40 py-24 p-6 shadow-lg bg-white overflow-y-scroll`}
						>
							<div
								onClick={props.onClose}
								className="bg-main-red text-white p-2 w-fit rounded-full cursor-pointer absolute top-24 right-6"
							>
								<CloseSVG className="w-3" />
							</div>
							{props.children}
						</div>
					)}
				</>,
				document.querySelector("#portal")!
		  )
		: null
}

interface SidebarButtonProps extends Props {
	label: JSX.Element
	initialOpen?: boolean
	onClose?: () => void
	handleClose?: (close: () => void) => void
	onOpen?: () => void
}

const SidebarButton: FC<SidebarButtonProps> = (props) => {
	const [open, setOpen] = useState<boolean>(props.initialOpen || false)

	const handleToggle = () => setOpen((prev) => !prev)

	useEffect(() => {
		if (!open) props.onClose?.call(this)
		else {
			props.onOpen?.call(this)
		}
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

			<Popup onClose={() => setOpen(false)} show={open}>
				{props.children}
			</Popup>
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
