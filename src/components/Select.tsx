import React, { FC, useState } from "react"
import ArrowDownSVG from "@/public/arrow-down.svg"

interface Props {
	label?: string
	options?: IOption[] | string[] | number[]
	onBlur?: React.FocusEventHandler<HTMLSelectElement>
	onChange?: React.ChangeEventHandler<HTMLSelectElement>
	value?: string | number
	defaultValue?: string | number
	disabled?: boolean
	className?: string
}

interface IOption {
	label: string | number
	value: string | number
}

const Select: FC<Props> = (props) => {
	const [value, setValue] = useState<string>()

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		props.onChange?.call(this, e)
		console.log(e.target.value)
		setValue(e.target.value)
	}

	const renderOptions = () => {
		if (!props.options || !props.options.length) return <></>

		switch (typeof props.options[0]) {
			case "object":
				return (props.options as IOption[]).map((e: IOption) => (
					<option key={e.value} value={e.value.toString()}>
						{e.label}
					</option>
				))

			default:
				return (props.options as string[] | number[]).map((e) => (
					<option key={e} value={e.toString()}>
						{e}
					</option>
				))
		}
	}

	const getLabel = () => {
		if (!props.options) return ""

		if (!value && props.defaultValue) {
			if (typeof props.options[0] === "object") {
				return (props.options as IOption[]).find(
					(e) => e.value === props.defaultValue
				)?.label
			} else {
				return (props.options as any[]).find((e) => e === props.defaultValue)
			}
		}

		if (value) {
			if (typeof props.options[0] === "object") {
				return (props.options as any[]).find((e) => e.value === value).label
			} else {
				return value
			}
		}

		return typeof props.options[0] === "object"
			? (props.options[0] as IOption).label
			: props.options[0]
	}

	return (
		<div className={props.className}>
			{props.label && <div className="mb-2">{props.label}</div>}
			<div className="relative shadow-lg h-11 w-full rounded-lg flex justify-between items-center px-3 border border-gray-200">
				<div className="truncate">{getLabel()}</div>
				<ArrowDownSVG className="w-3 ml-2" />
				<select
					className="absolute top-0 left-0 w-full h-full opacity-0"
					onBlur={props.onBlur}
					onChange={handleChange}
					value={value}
					defaultValue={props.defaultValue}
					disabled={props.disabled}
				>
					{renderOptions()}
				</select>
			</div>
		</div>
	)
}

export default Select
