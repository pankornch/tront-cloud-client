import React, { useMemo } from "react"

interface Props {
	totalCount: number
	pageSize: number
	initPage?: number
	currentPage: number
}

export const DOTS = "..."

const range = (start: number, end: number) => {
	const length = end - start + 1

	return Array(length).fill("").map((_, i) => i + start)
}

const usePagination = ({
	totalCount,
	pageSize,
	initPage = 1,
	currentPage,
}: Props) => {
	const paginationRage = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize)

		const totalPageNumber = initPage + 5

		if (totalPageNumber >= totalPageCount) {
			return range(1, totalPageCount)
		}

		const leftSideIndex = Math.max(currentPage - initPage, 1)
		const rightSideIndex = Math.min(currentPage + initPage, totalPageCount)

		const shouldShowLeftDots = leftSideIndex > 2
		const shouldShowRightDots = rightSideIndex < totalPageCount - 2

		const firstPageIndex = 1
		const lastPageIndex = totalPageCount

		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount = 3 + 2 * initPage
			let leftRange = range(1, leftItemCount)

			return [...leftRange, DOTS, totalPageCount]
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * initPage
			let rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount
			)
			return [firstPageIndex, DOTS, ...rightRange]
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = range(leftSideIndex, rightSideIndex)
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
		}
	}, [totalCount, pageSize, initPage, currentPage])

	return paginationRage
}

export default usePagination
