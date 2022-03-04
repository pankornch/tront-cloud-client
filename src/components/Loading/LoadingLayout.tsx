import React, { FC, useCallback } from "react"
import Lottie from "lottie-react"
import CloudLoading from "@/public/cloud-lottie-animation.json"

interface Props {
	isLoading: boolean
	loadingContent?: JSX.Element
	isEmpty?: boolean
	emptyContent?: JSX.Element
	className?: string
}

export const LoadingLayout: FC<Props> = (props) => {
	const content = useCallback(() => {
		if (props.isLoading) {
			return (
				<Lottie animationData={CloudLoading} className="w-full h-full" loop />
			)
		}

		if (props.isEmpty) {
			return props.emptyContent || <div>Empty</div>
		}

		return props.children
	}, [props.isLoading, props.isEmpty, props.children])

	return (
		<div className={props.className || "w-screen h-screen"}>{content()}</div>
	)
}
