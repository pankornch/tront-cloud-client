import React, { FC, useMemo } from "react"
import EmptySVG from "@/public/empty.svg"
import LoadingSVG from "@/public/loading.svg"

interface Props<T> {
	keys: (keyof T)[]
	data: T[]
	loading?: boolean
	actions?: (row: T) => JSX.Element
}

function Table<T>(props: Props<T>) {
	const head = useMemo(() => {
		return (
			<thead className="bg-main-blue text-white ">
				<tr className="text-left divide-x">
					{props.keys.map((e, i) => (
						<th key={i} className="px-6 py-4 min-w-[10rem] overflow-hidden">
							{e}
						</th>
					))}
					{props.data?.length > 0 && props.actions && (
						<th className="px-6 py-4 min-w-[10rem] overflow-hidden">Actions</th>
					)}
				</tr>
			</thead>
		)
	}, [props.actions, props.data?.length, props.keys])

	const body = useMemo(() => {
		let colSpan = 0
		if (props.data?.length > 0 && props.actions) {
			colSpan = props.keys.length + 1
		} else {
			colSpan = props.keys.length
		}

		if (props.loading) {
			return (
				<tbody>
					<tr>
						<td colSpan={colSpan} className="">
							<div className="w-full flex flex-col items-center p-12 bg-slate-50 space-y-6 cursor-wait">
								<LoadingSVG className="h-12 text-main-blue animate-spin" />
							</div>
						</td>
					</tr>
				</tbody>
			)
		}

		if (!props.data?.length)
			return (
				<tbody>
					<tr>
						<td colSpan={colSpan} className="">
							<div className="w-full flex flex-col items-center p-12 bg-slate-50 space-y-6">
								<EmptySVG className="h-48 text-main-blue" />
								<div>No data</div>
							</div>
						</td>
					</tr>
				</tbody>
			)
		return (
			<tbody className="divide-y divide-gray-200">
				{props.data.map((e, i) => (
					<tr
						key={i}
						className="hover:bg-gray-100 even:bg-gray-100 odd:bg-white divide-x"
					>
						{props.keys.map((u, o) => (
							<td key={o} className="px-6 py-4">
								{(e[u] as any)?.toString()}
							</td>
						))}
						{props.data?.length > 0 && props.actions && (
							<td className="px-6 py-4">{props.actions(e)}</td>
						)}
					</tr>
				))}
			</tbody>
		)
	}, [props])

	return (
		<table className="w-full whitespace-nowrap bg-white divide-y divide-gray-300">
			{head}
			{body}
		</table>
	)
}

export default React.memo(Table) as typeof Table
