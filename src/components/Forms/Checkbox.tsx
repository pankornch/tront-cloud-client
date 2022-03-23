import React, { FC, useEffect, useState } from "react"
import CheckedSVG from "@/public/checkbox-checked.svg"
import UncheckSVG from "@/public/checkbox-uncheck.svg"
import { ChangeValueHandler } from "@/src/types"

interface Props {
	checked?: boolean
	label?: string
	className?: string
	labelClassName?: string
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	onChageValue?: ChangeValueHandler<boolean>
	onBlur?: React.FocusEventHandler<HTMLInputElement>
	name?: string
	disabled?: boolean
}

const Checkbox: FC<Props> = (props) => {
	const [checked, setChecked] = useState<boolean>(false)
	const handleToggle = () => setChecked((prev) => !prev)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange?.call(this, e)
		props.onChageValue?.call(this, e.target.checked)
		handleToggle()
	}

	useEffect(() => {
		if (props.checked === undefined) return
		setChecked(props.checked || false)
	}, [props.checked, checked])

	return (
		<div className={props.className}>
			<div
				className={`flex items-center relative w-fit h-fit ${
					props.disabled ? "opacity-50" : ""
				}`}
			>
				<input
					name={props.name}
					type="checkbox"
					onChange={handleChange}
					checked={checked}
					onBlur={props.onBlur}
					className="w-full h-full opacity-0 absolute top-0 left-0 z-10"
					disabled={props.disabled}
				/>
				<div className={"w-4 h-4"}>
					{checked ? <CheckedSVG /> : <UncheckSVG />}
				</div>
				{props.label && (
					<span className={props.labelClassName || "ml-3"}>{props.label}</span>
				)}
			</div>
		</div>
	)
}

export default React.memo(Checkbox)
