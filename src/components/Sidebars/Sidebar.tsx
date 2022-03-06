import React, { FC, useEffect, useMemo, useState } from "react"
import CloseSVG from "@/public/close.svg"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"

type childrenContent = JSX.Element | JSX.Element[]

interface Props {
	children: childrenContent
}

interface PopupProps extends Props {
	onClose?: (bool: boolean) => any
	show: boolean
}

const variants = {
	open: {
		right: 0,
		transition: {
			type: "spring",
			bounce: 0,
		},
	},
	closed: { right: "-100%" },
}

const Popup: FC<PopupProps> = (props) => {
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	return mounted
		? createPortal(
				<>
					{props.show && (
						<motion.div
							className="w-screen h-screen bg-black opacity-25 fixed top-0 right-0 z-30"
							onClick={props.onClose?.bind(this, false)}
						></motion.div>
					)}
					<AnimatePresence>
						<motion.div
							className={`w-screen md:w-[40rem] h-screen fixed top-0  z-40 py-24 p-6 shadow-lg bg-white overflow-y-scroll`}
							variants={variants}
							initial="closed"
							animate={props.show ? "open" : "closed"}
							exit="closed"
						>
							<div
								onClick={props.onClose?.bind(this, false)}
								className="bg-main-red text-white p-2 w-fit rounded-full cursor-pointer absolute top-24 right-6"
							>
								<CloseSVG className="w-3" />
							</div>
							{props.children}
						</motion.div>
					</AnimatePresence>
				</>,
				document.getElementById("portal")!
		  )
		: null
}

interface SidebarButtonProps extends Props {
	label: JSX.Element
	initialOpen?: boolean
	open?: boolean
	onClose?: (bool: boolean) => void
	handleClose?: (close: () => void) => void
	onOpen?: () => void
}

const SidebarButton: FC<SidebarButtonProps> = (props) => {
	const [open, setOpen] = useState<boolean>(
		props.open || props.initialOpen || false
	)

	const handleToggle = () => setOpen((prev) => !prev)

	useEffect(() => {
		// if (!open) props.onClosse?.call(this, false)
		// else {
		// 	props.onOpen?.call(this)
		// }
	}, [open, props.open])

	useEffect(() => {
		props.handleClose?.call(this, () => {
			setOpen(false)
			props.onClose?.call(this, false)
		})
	}, [props.handleClose])

	const onClose = () => {
		setOpen(false)
		props.onClose?.call(this, false)
	}

	return (
		<div>
			<button type="button" onClick={handleToggle}>
				{props.label}
			</button>

			<Popup onClose={onClose} show={open}>
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
