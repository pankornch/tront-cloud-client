import { useMemo, useRef, useState } from "react"
import { IApiSchema, IModel } from "../types"
import cloneObj from "../utils/cloneObj"
interface Props {
	model: Partial<IModel>
	apiSchema?: IApiSchema
}

const defaultValue = (data?: IApiSchema) => {
	return (
		data || {
			methods: [
				{
					name: "GET_ALL",
					pathname: `/`,
					active: true,
					public: false,
				},
				{
					name: "GET_ONE",
					pathname: "/_/:_id",
					active: true,
					public: false,
				},
				{
					name: "POST",
					pathname: "/_/:_id",
					active: true,
					public: false,
				},
				{
					name: "PATCH",
					pathname: "/_/:_id",
					active: true,
					public: false,
				},
				{
					name: "PUT",
					pathname: "/_/:_id",
					active: true,
					public: false,
				},
				{
					name: "DELETE",
					pathname: "/_/:_id",
					active: true,
					public: false,
				},
			],
		}
	)
}

const getApiMethodColor = (name: string) => {
	switch (name) {
		case "POST":
			return "text-main-blue"
		case "PATCH":
			return "text-main-yellow"
		case "PUT":
			return "text-main-orange"
		case "DELETE":
			return "text-main-red"
		default:
			return "text-main-green"
	}
}

const useApiSchema = (props: Props) => {
	const [apiSchema, setApiSchema] = useState<IApiSchema>(
		defaultValue(props?.apiSchema)
	)

	const cloneApiSchemaRef = useRef<IApiSchema>()

	const modelNameRef = useRef<string>("")

	return useMemo(() => {
		const handleChangeMethodApi = (
			value: any,
			key: "pathname" | "active" | "public",
			index: number
		) => {
			const clone = cloneObj(apiSchema)
			clone.methods[index][key] = value

			setApiSchema(clone)
		}

		const handleClearApiSchema = () => {
			setApiSchema(defaultValue(props?.apiSchema))
		}

		const handleResetApiSchema = () => {
			setApiSchema(cloneApiSchemaRef.current!)
		}

		if (props.apiSchema) {
			cloneApiSchemaRef.current = cloneObj(props.apiSchema)
		}

		if (props.model.name && props.model.name != modelNameRef.current) {
			modelNameRef.current = props.model.name
			setApiSchema((prev) => {
				if (!prev.model?._id) prev.model = {}
				prev.model!.name = props.model.name
				prev.methods = apiSchema.methods.map((e) => ({
					...e,
					pathname: e.pathname.endsWith("/:_id")
						? `/${props.model.name}/:_id`
						: `/${props.model.name}`,
				}))
				return cloneObj(prev)
			})
		} else if (!props.model.name && modelNameRef.current) {
			modelNameRef.current = ""
			setApiSchema((prev) => {
				prev.methods = apiSchema.methods.map((e) => ({
					...e,
					pathname: e.pathname.endsWith("/:_id") ? "/_/:_id" : "/_",
				}))
				return cloneObj(prev)
			})
		}

		return {
			apiSchema,
			setApiSchema,
			getApiMethodColor,
			handleChangeMethodApi,
			handleClearApiSchema,
			handleResetApiSchema,
		}
	}, [apiSchema, props])
}

export default useApiSchema
