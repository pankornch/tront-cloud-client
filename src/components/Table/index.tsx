import React, { FC, useMemo } from "react"
interface Props {
	keys: string[] | number[]
	data: any[]
}

const Table: FC<Props> = (props) => {
	const head = useMemo(() => {
		return (
			<thead className="bg-main-blue text-white ">
				<tr className="text-left">
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
		return (
			<tbody className="divide-y divide-gray-200">
				{props.data.map((e, i) => (
					<tr
						key={i}
						className="hover:bg-gray-100 odd:bg-gray-100 even:bg-white"
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
	}, [props.data, props.keys])

	return (
		<table className="w-full whitespace-nowrap bg-white divide-y divide-gray-300">
			{head}
			{body}
		</table>
	)
}

export default React.memo(Table)
