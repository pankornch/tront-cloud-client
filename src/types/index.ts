export interface IApp {
	_id: string
	name: string
	user: IUser
	description: string
	slug: string
	active: boolean
	apiConfigs: IApiConfigs
	modelConfigs: IModelConfig
	members: IMember[]
	createdAt: string | Date
}

export interface IUser {
	_id: string
	email: string
	avatar: string
}

export interface IModelConfig {
	models: IModel[]
}

export interface IModel {
	_id: string
	name: string
	fields: IField[]
}

export interface IField {
	name: string
	type: ModelTypes
	required: boolean
	defaultValue: string | number
}

export interface IApiConfigs {
	apiTypes: IApiType[]
	apiSchemas: IApiSchema[]
}
export interface IApiType {
	type: ApiTypes
	url: string
}

export interface IApiSchema {
	model?: Partial<IModel>
	methods: IApiMethod[]
}

export interface IApiMethod {
	name: ApiNames
	active: boolean
	public: boolean
	pathname: string
}

export interface ISchema {
	model: Partial<IModel>
	apiSchema?: Partial<IApiSchema>
}

export interface IMember {
	_id: string
	app: Partial<IApp>
	user: Partial<IUser>
	status: boolean
	role: string
}

export type ModelTypes =
	| "OBJECT_ID"
	| "STRING"
	| "NUMBER"
	| "DATE"
	| "OBJECT"
	| "ARRAY"
	| "BOOLEAN"

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
