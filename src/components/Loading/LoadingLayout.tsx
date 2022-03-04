import React, { FC, useCallback } from "react"
import Lottie from "lottie-react"
import CloudLoading from "@/public/cloud-lottie-animation.json"
import Loading from "@/public/loading.json"

interface Props {
	isLoading: boolean
	loadingContent?: JSX.Element
	isEmpty?: boolean
	emptyContent?: JSX.Element
	className?: string
}

export const LoadingLayout: FC<Props> = (props) => {
	const loadindContent = useCallback(() => {
		if (props.isLoading) {
			return (
				<div className="h-full w-full flex items-center justify-center">
					<Lottie animationData={Loading} className="w-56 h-56" loop />
				</div>
			)
		}

		if (props.isEmpty) {
			return props.emptyContent || <div>Empty</div>
		}

		return <></>
	}, [props.isLoading, props.isEmpty])

	if (props.isLoading || props.isEmpty) {
		return <div className={props.className || "w-screen h-screen"}>{loadindContent()}</div>
	}
	return <div className={props.className}>{props.children}</div>
}
