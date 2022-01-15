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
