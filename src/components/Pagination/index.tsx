import React, { FC } from "react"
import BackSVG from "@/public/back.svg"
import usePagination, { DOTS } from "./usePagination"

type OnPageChangeHandler = (page: number) => void

interface Props {
	currentPage: number
	pageSize: number
	totalCount: number
	onPageChange?: OnPageChangeHandler
}

const Pagination: FC<Props> = (props) => {
	const paginationRange = usePagination(props)

	const lastPage = paginationRange![paginationRange!.length - 1]

	const onNext = () => {
		if (props.currentPage >= lastPage) return
		props.onPageChange?.call(this, props.currentPage + 1)
	}

	const onPrevious = () => {
		if (props.currentPage <= 1) return
		props.onPageChange?.call(this, props.currentPage - 1)
	}

	const getPageStyle = (pageNumber: number) => {
		return pageNumber === props.currentPage ? (
			<div
				aria-current="page"
				className="z-10 bg-indigo-50 border-main-blue text-main-blue relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer"
			>
				{pageNumber}
			</div>
		) : (
			<div
				onClick={() => props.onPageChange?.call(this, pageNumber)}
				className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer"
			>
				{pageNumber}
			</div>
		)
	}

	return (
		<div className="bg-white flex items-center justify-between border-gray-200">
			{/* <div className="flex-1 flex justify-between sm:hidden space-x-3">
				<div
					onClick={onPrevious}
					className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
				>
					Previous
				</div>
				{getPageStyle(props.currentPage)}
				<div
					onClick={onNext}
					className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
				>
					Next
				</div>
			</div> */}
			<div className="flex-1 sm:flex sm:items-center sm:justify-between">
				<div>
					<nav
						className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
						aria-label="Pagination"
					>
						<button
							type="button"
							disabled={props.currentPage <= 1}
							onClick={onPrevious}
							className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer disabled:cursor-default disabled:bg-gray-100"
						>
							<span className="sr-only">Previous</span>
							<BackSVG className="h-5 w-5" />
						</button>

						{paginationRange!.map((pageNumber, i) => (
							<div key={i}>
								{pageNumber === DOTS ? (
									<span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 cursor-default">
										...
									</span>
								) : (
									getPageStyle(pageNumber as number)
								)}
							</div>
						))}
						<button
							type="button"
							disabled={props.currentPage === lastPage}
							onClick={onNext}
							className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer disabled:cursor-default disabled:bg-gray-100"
						>
							<span className="sr-only">Next</span>
							<BackSVG className="h-5 w-5 rotate-180" />
						</button>
					</nav>
				</div>
			</div>
		</div>
	)
}

export default Pagination
