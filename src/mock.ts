import { IApiSchema, IModel } from "./types"

export const MOCK_MODELS: IModel[] = [
	{
		_id: "5398764f6f23",
		name: "Users",
		fields: [
			{
				name: "_id",
				type: "OBJECT_ID",
				defaultValue: "",
				isRequired: true,
			},
			{
				name: "name",
				type: "STRING",
				defaultValue: "",
				isRequired: true,
			},
		],
	},
	{
		_id: "d1e3039422ad",
		name: "Books",
		fields: [
			{
				name: "_id",
				type: "OBJECT_ID",
				defaultValue: "",
				isRequired: true,
			},
			{
				name: "name",
				type: "STRING",
				defaultValue: "",
				isRequired: true,
			},
			{
				name: "author",
				type: "OBJECT_ID",
				defaultValue: "",
				isRequired: true,
				relationship: {
					type: "BELONG_TO",
					sourceField: "_id",
					targetField: "_id",
					targetModel: "Books",
				},
			},
			{
				name: "createdAt",
				type: "DATE",
				defaultValue: "",
				isRequired: false,
			},
		],
	},
]

export const MOCK_API_SCHEMAS: IApiSchema[] = [
	{
		model: {
			_id: "5398764f6f23",
			name: "Users",
		},
		methods: [
			{
				name: "GET",
				pathname: "/users",
				active: true,
				public: true,
			},
			{
				name: "GET",
				pathname: "/users/:id",
				active: true,
				public: true,
			},
			{
				name: "POST",
				pathname: "/users",
				active: true,
				public: true,
			},
			{
				name: "PATCH",
				pathname: "/users/:id",
				active: true,
				public: false,
			},
			{
				name: "PUT",
				pathname: "/users/:id",
				active: false,
				public: false,
			},
			{
				name: "DELETE",
				pathname: "/users/:id",
				active: false,
				public: false,
			},
		],
	},
	{
		model: {
			_id: "d1e3039422ad",
			name: "Books",
		},
		methods: [
			{
				name: "GET",
				pathname: "/books",
				active: true,
				public: true,
			},
			{
				name: "GET",
				pathname: "/books/:id",
				active: true,
				public: true,
			},
			{
				name: "POST",
				pathname: "/books",
				active: true,
				public: true,
			},
			{
				name: "PATCH",
				pathname: "/books/:id",
				active: true,
				public: false,
			},
			{
				name: "PUT",
				pathname: "/books/:id",
				active: false,
				public: false,
			},
			{
				name: "DELETE",
				pathname: "/books/:id",
				active: false,
				public: false,
			},
		],
	},
]
