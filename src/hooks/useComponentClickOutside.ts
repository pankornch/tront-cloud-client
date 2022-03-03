import React, { useState, useEffect, useRef } from "react"

const useComponentClickOutside = (initValue?: boolean, onClose?: () => void) => {
	const [show, setShow] = useState<boolean>(initValue || false)
	const ref = useRef<any>(null)
	const toggle = () => setShow((prev) => !prev)

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true)
		return () => {
			document.removeEventListener("click", handleClickOutside, true)
		}
	}, [])

	const handleClickOutside = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setShow(false)
			onClose?.call(this)
		}
	}

	return {
		ref,
		show,
		setShow,
		toggle,
	}
}

export default useComponentClickOutside
