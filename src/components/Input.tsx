import React, { FC, useEffect } from "react"

interface Props {
	type?: React.HTMLInputTypeAttribute
	leftIcon?: JSX.Element
	label?: string
	placeholder?: string
	value?: string | number
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	onBlur?: React.FocusEventHandler<HTMLInputElement>
	name?: string
	id?: string
    errorText?: string
}

const Input: FC<Props> = (props) => {
	return (
		<div className="w-full">
			{props.label && <div className="mb-2">{props.label}</div>}
			<div className="border-2 border-gray-200 shadow-md px-3 py-2 rounded-md flex items-center w-full">
				{props.leftIcon && <div className="mr-5">{props.leftIcon}</div>}
				<input
					className="focus:border-none focus:outline-none w-full"
					id={props.id}
					name={props.name}
					type={props.type}
					onChange={props.onChange}
					onBlur={props.onBlur}
					value={props.value}
					placeholder={props.placeholder}
				/>
			</div>
            {props.errorText && <div className="text-main-red mt-2 ml-4">{props.errorText}</div>}
		</div>
	)
}

export default Input
