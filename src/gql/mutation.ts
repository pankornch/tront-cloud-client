import { gql } from "@apollo/client"

export const SIGN_UP_MUTATION = gql`
	mutation ($input: SignUpInput!) {
		signUp(input: $input) {
			token
			user {
				_id
				email
			}
		}
	}
`

export const SIGN_IN_MUTATION = gql`
	mutation ($input: SignInInput!) {
		signIn(input: $input) {
			token
			user {
				_id
				email
			}
		}
	}
`

export const OAUTH_MUTATION = gql`
	mutation ($input: OauthInput!) {
		oauth(input: $input) {
			token
			user {
				_id
				email
			}
		}
	}
`

export const CREATE_APP_MUTATION = gql`
	mutation ($input: CreateAppInput!) {
		createApp(input: $input) {
			_id
		}
	}
`

export const UPDATE_APP_MUTATIION = gql`
	mutation ($input: UpdateAppInput!) {
		updateApp(input: $input) {
			name
			slug
			description
		}
	}
`

export const DELETE_APP_MUTATION = gql`
	mutation ($input: DeleteAppInput!) {
		deleteApp(input: $input)
	}
`

export const CREATE_SCHEMA_MUTATION = gql`
	mutation ($input: CreateSchemaInput!) {
		createSchema(input: $input) {
			model {
				name
			}
		}
	}
`
export const UPDATE_SCHEMA_MUTATION = gql`
	mutation ($input: UpdateSchemaInput!) {
		updateSchema(input: $input) {
			model {
				name
			}
		}
	}
`

export const DELETE_SCHEMA_MUTATION = gql`
	mutation ($input: DeleteSchemaInput!) {
		deleteSchema(input: $input)
	}
`