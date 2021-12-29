import React, { FC, useEffect, useState } from "react"
import CheckedSVG from "@/public/checkbox-checked.svg"
import UncheckSVG from "@/public/checkbox-uncheck.svg"

interface Props {
	checked?: boolean
	defaultChecked?: boolean
	label?: string
	className?: string
	labelClassName?: string
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	onBlur?: React.FocusEventHandler<HTMLInputElement>
	name?: string
    disabled?: boolean
}

const Checkbox: FC<Props> = (props) => {
	const [checked, setChecked] = useState<boolean>(false)
	const handleToggle = () => setChecked((prev) => !prev)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange?.call(this, e)
		handleToggle()
	}

	useEffect(() => {
		if (props.checked && props.checked != checked) setChecked(true)
	}, [props.checked, checked])

	useEffect(() => {
		if (props.defaultChecked) setChecked(true)
	}, [props.defaultChecked])

	return (
		<div className="flex items-center relative w-fit">
			<input
				name={props.name}
				type="checkbox"
				onChange={handleChange}
				checked={checked}
				onBlur={props.onBlur}
				className="w-full h-full opacity-0 absolute top-0 left-0 z-10"
                disabled={props.disabled}
			/>
			<div className={props.className || "w-4 h-4"}>
				{checked ? <CheckedSVG /> : <UncheckSVG />}
			</div>
			{props.label && (
				<span className={props.labelClassName || "ml-3"}>{props.label}</span>
			)}
		</div>
	)
}

export default Checkbox
