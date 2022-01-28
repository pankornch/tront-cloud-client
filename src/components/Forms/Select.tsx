import React, { FC, useCallback, useEffect, useMemo } from "react"
import { ChangeValueHandler } from "../../types"
import ArrowSVG from "@/public/arrow-down.svg"

interface Props {
	label?: string
	options?: IOption[] | string[] | number[]
	onBlur?: React.FocusEventHandler<HTMLSelectElement>
	onChange?: React.ChangeEventHandler<HTMLSelectElement>
	onChangeValue?: ChangeValueHandler<any>
	value?: string | number
	defaultValue?: string | number
	disabled?: boolean
	className?: string
	onInitSelect?: ChangeValueHandler<any>
}

interface IOption {
	label: string | number
	value: string | number
}

const Select: FC<Props> = (props) => {
	useEffect(() => {
		if (!props.options?.length) return
		
		return () => {}
	}, [props.options])

	useEffect(() => {
		if (!props.options) return
		props.onInitSelect?.call(this, getValue(props.options[0]))
	}, [])

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		props.onChange?.call(this, e)
		props.onChangeValue?.call(this, e.target.value)
	}

	const getValue = useCallback((value: string | number | IOption) => {
		switch (typeof value) {
			case "string":
			case "number":
				return value
			default:
				return value.value
		}
	}, [])

	const renderOptions = useMemo(() => {
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
	}, [props.options])

	return (
		<div className={props.className}>
			{props.label && <div className="mb-1">{props.label}</div>}
			<div className="relative">
				<select
					className="input appearance-none text-ellipsis !pr-8"
					onBlur={props.onBlur}
					value={props.value}
					onChange={handleChange}
					defaultValue={props.value ? undefined : props.defaultValue}
					disabled={props.disabled}
				>
					{renderOptions}
				</select>
				<div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
					<ArrowSVG className="w-3 h-3" />
				</div>
			</div>
		</div>
	)
}

export default React.memo(Select)
