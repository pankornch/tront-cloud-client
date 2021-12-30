export interface IModel {
	_id?: string
	name?: string
	fields?: IField[]
}

export interface IField {
	name?: string
	type?: string
	isRequired?: boolean
	defaultValue?: string
	relationship?: IRelationship
}

export interface IRelationship {
	type?: string
	sourceField?: string
	targetField?: string
	targetModel?: string
}

export interface IApiSchema {
	model?: string | IModel
	methods?: IApiMethod[]
}

export interface IApiMethod {
	name?: string
	active?: boolean
	public?: boolean
	allowToUpdateField?: string[]
	pathname?: string
}
