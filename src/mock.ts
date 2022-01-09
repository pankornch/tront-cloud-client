import { IApiSchema, IApp, IModel } from "./types"

export const MOCK_MODELS: IModel[] = [
	{
		_id: "5398764f6f23",
		name: "Users",
		fields: [
			{
				name: "_id",
				type: "OBJECT_ID",
				defaultValue: "",
				required: true,
			},
			{
				name: "name",
				type: "STRING",
				defaultValue: "",
				required: true,
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
				required: true,
			},
			{
				name: "name",
				type: "STRING",
				defaultValue: "",
				required: true,
			},
			{
				name: "author",
				type: "OBJECT_ID",
				defaultValue: "",
				required: true,
			},
			{
				name: "createdAt",
				type: "DATE",
				defaultValue: "",
				required: false,
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
				name: "GET_ALL",
				pathname: "/users",
				active: true,
				public: true,
			},
			{
				name: "GET_ONE",
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
				name: "GET_ALL",
				pathname: "/books",
				active: true,
				public: true,
			},
			{
				name: "GET_ONE",
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

export const MOCK_BOOKS_DATA = [
	{
		createdAt: "2021-12-28T18:33:04.193Z",
		name: "Jan Steuber",
		avatar: "https://cdn.fakercloud.com/avatars/millinet_128.jpg",
		id: "1",
	},
	{
		createdAt: "2021-12-29T08:35:33.097Z",
		name: "Teresa Wolff",
		avatar: "https://cdn.fakercloud.com/avatars/vaughanmoffitt_128.jpg",
		id: "2",
	},
	{
		createdAt: "2021-12-29T09:11:44.053Z",
		name: "Melody Mueller",
		avatar: "https://cdn.fakercloud.com/avatars/alxleroydeval_128.jpg",
		id: "3",
	},
	{
		createdAt: "2021-12-29T10:28:14.504Z",
		name: "Sidney Rice",
		avatar: "https://cdn.fakercloud.com/avatars/rude_128.jpg",
		id: "4",
	},
	{
		createdAt: "2021-12-29T07:37:25.979Z",
		name: "Guadalupe Rippin V",
		avatar: "https://cdn.fakercloud.com/avatars/geran7_128.jpg",
		id: "5",
	},
	{
		createdAt: "2021-12-28T16:28:41.299Z",
		name: "Israel Daugherty",
		avatar: "https://cdn.fakercloud.com/avatars/AlbertoCococi_128.jpg",
		id: "6",
	},
	{
		createdAt: "2021-12-29T09:27:29.742Z",
		name: "Mrs. Michele Zieme",
		avatar: "https://cdn.fakercloud.com/avatars/ashocka18_128.jpg",
		id: "7",
	},
	{
		createdAt: "2021-12-29T12:49:49.570Z",
		name: "Rosemary Barton",
		avatar: "https://cdn.fakercloud.com/avatars/afusinatto_128.jpg",
		id: "8",
	},
	{
		createdAt: "2021-12-29T07:15:48.352Z",
		name: "Mary Schmitt",
		avatar: "https://cdn.fakercloud.com/avatars/ryankirkman_128.jpg",
		id: "9",
	},
	{
		createdAt: "2021-12-28T17:45:39.173Z",
		name: "Merle Langworth",
		avatar: "https://cdn.fakercloud.com/avatars/kevinjohndayy_128.jpg",
		id: "10",
	},
]

export const MOCK_APPS: IApp[] = [
	{
		_id: "1",
		name: "todo_app",
		slug: "todo_app",
		active: true,
		modelConfigs: {
			models: [
				{
					_id: "1",
					name: "Users",
					fields: [
						{
							name: "_id",
							type: "OBJECT_ID",
							defaultValue: '',
							required: true,
						},
						{
							name: "email",
							type: "STRING",
							defaultValue: '',
							required: true,
						},
						{
							name: "createdAt",
							type: "DATE",
							defaultValue: "$currentDate",
							required: true,
						},
					],
				},
				{
					_id: "2",
					name: "Books",
					fields: [
						{
							name: "_id",
							type: "OBJECT_ID",
							defaultValue: '',
							required: true,
						},
						{
							name: "title",
							type: "STRING",
							defaultValue: '',
							required: true,
						},
						{
							name: "authorId",
							type: "OBJECT_ID",
							defaultValue: '',
							required: true,
						},
						{
							name: "createdAt",
							type: "DATE",
							defaultValue: "$currentDate",
							required: true,
						},
					],
				},
			],
			relationships: [
				{
					sourceField: "_id",
					targetField: "_id",
					sourceModel: "1",
					targetModel: "2",
					type: "HAS_MANY",
				},
				{
					sourceField: "_id",
					targetField: "_id",
					sourceModel: "2",
					targetModel: "1",
					type: "BELONGS_TO",
				},
			],
		},

		apiConfig: {
			apiTypes: [{ type: "REST", url: "https://tront.com/api/todo_app/rest" }],
			schemas: [
				{
					model: "1",
					methods: [
						{ name: "GET_ALL", pathname: "/users", active: true, public: true },
						{
							name: "GET_ONE",
							pathname: "/users/:id",
							active: true,
							public: true,
						},
						{ name: "POST", pathname: "/users", active: true, public: false },
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
					model: "2",
					methods: [
						{ name: "GET_ALL", pathname: "/books", active: true, public: true },
						{
							name: "GET_ONE",
							pathname: "/books/:id",
							active: true,
							public: true,
						},
						{ name: "POST", pathname: "/books", active: true, public: false },
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
			],
		},
	},
]
