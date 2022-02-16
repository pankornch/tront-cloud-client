import { IApp } from "../types"

const mapSchemas = (app: IApp) => {
	const $schemas = []

	for (const model of app.modelConfigs.models) {
		$schemas.push({
			model,
			apiSchema: app.apiConfigs.apiSchemas.find(
				(e) => e.model?._id === model._id
			),
		})
	}
	return $schemas
}

export default mapSchemas
