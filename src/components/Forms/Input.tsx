import React, { FC, useMemo, useState } from "react"
import { ChangeValueHandler } from "../../types"

type InputTypes = "email" | "text" | "password" | "number"

interface Props {
	type?: InputTypes
	leftIcon?: JSX.Element
	label?: string
	placeholder?: string
	value?: string | number
	defaultValue?: string | number
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	onChangeValue?: ChangeValueHandler<string | number>
	onBlur?: React.FocusEventHandler<HTMLInputElement>
	name?: string
	id?: string
	errorText?: string
	disabled?: boolean
	required?: boolean
	className?: string
	readOnly?: boolean
}

const Input: FC<Props> = (props) => {
	const [errorText, setErrorText] = useState<string | null>()

	const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
		props.onBlur?.call(this, e)
		if (props.required) {
			if (!e.target.value) setErrorText(`${props.name} is required`)
			else setErrorText(null)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange?.call(this, e)
		props.onChangeValue?.call(this, e.target.value)
	}

	const getErrorText = useMemo(() => {
		return props.errorText || errorText
	}, [props.errorText, errorText])

	return (
		<div className={props.className}>
			{props.label && <div className="mb-1">{props.label}</div>}
			<div className="relative w-full">
				{props.leftIcon && (
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 w-12">
						{props.leftIcon}
					</div>
				)}

				<input
					className={`input ${props.leftIcon ? "!pl-12" : ""}`}
					id={props.id}
					name={props.name}
					onBlur={handleBlur}
					onChange={handleChange}
					value={props.value}
					required={props.required}
					disabled={props.disabled}
					defaultValue={props.value ? undefined : props.defaultValue}
					placeholder={props.placeholder}
					type={props.type}
					readOnly={props.readOnly}
				/>
			</div>
			{getErrorText && (
				<div className="text-main-red mt-2 ml-4 truncate">{getErrorText}</div>
			)}
		</div>
	)
}

export default React.memo(Input)
