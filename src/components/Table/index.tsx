import React, { FC, useMemo } from "react"
import EmptySVG from "@/public/empty.svg"
import LoadingSVG from "@/public/loading.svg"

interface Props {
	keys: string[] | number[]
	data?: any[]
	loading?: boolean
}

const Table: FC<Props> = (props) => {
	const head = useMemo(() => {
		return (
			<thead className="bg-main-blue text-white ">
				<tr className="text-left divide-x">
					{props.keys.map((e, i) => (
						<th key={i} className="uppercase px-6 py-4">
							{e}
						</th>
					))}
				</tr>
			</thead>
		)
	}, [props.keys])

	const body = useMemo(() => {
		if (props.loading) {
			return (
				<tbody>
					<tr>
						<td colSpan={props.keys.length} className="">
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
						<td colSpan={props.keys.length} className="">
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
								{e[u]}
							</td>
						))}
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

export default React.memo(Table)
