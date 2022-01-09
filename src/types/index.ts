export interface IApp {
	_id?: string
	name?: string
	slug?: string
	active?: boolean
	apiConfig?: IApiConfig
	modelConfigs?: IModelConfig
	createdAt?: string | Date
}

export interface IModelConfig {
	models?: IModel[]
	relationships?: IRelationship[]
}

export interface IModel {
	_id?: string
	name?: string
	fields?: IField[]
}

export interface IField {
	name?: string
	type?: ModelTypes
	required?: boolean
	defaultValue?: string | number
}

export interface IRelationship {
	type?: RelationshipTypes
	sourceField?: string
	sourceModel?: string
	targetField?: string
	targetModel?: string
}

export interface IApiConfig {
	apiTypes?: IApiType[]
	schemas?: IApiSchema[]
}
export interface IApiType {
	type?: ApiTypes
	url?: string
}

export interface IApiSchema {
	model?: string | IModel
	methods?: IApiMethod[]
}

export interface IApiMethod {
	name?: ApiNames
	active?: boolean
	public?: boolean
	pathname?: string
}

export type ModelTypes =
	| "OBJECT_ID"
	| "STRING"
	| "NUMBER"
	| "DATE"
	| "OBJECT"
	| "ARRAY"

export type ApiTypes = "REST"

export type RelationshipTypes =
	| "HAS_ONE"
	| "HAS_MANY"
	| "BELONGS_TO"
	| "BELONGS_TO_MANY"

export type ApiNames =
	| "GET_ALL"
	| "GET_ONE"
	| "POST"
	| "PATCH"
	| "PUT"
	| "DELETE"

export type ChangeValueHandler<T> = (value: T) => void
