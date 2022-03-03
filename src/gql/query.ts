import { gql, useQuery, QueryHookOptions, DocumentNode } from "@apollo/client"
import { useMemo } from "react"
import { IApp, IMember, IUser } from "../types"

export const APPS_QUERY = gql`
	query {
		apps {
			_id
			name
			slug
			active
			apiConfigs {
				apiTypes {
					type
					url
				}
			}
			createdAt
		}
	}
`

export const APP_BY_ID_QUERY = gql`
	query ($slug: ID!) {
		app(slug: $slug) {
			_id
			name
			description
			slug
			active
			modelConfigs {
				models {
					_id
					name
					fields {
						name
						type
						required
						defaultValue
					}
				}
			}
			apiConfigs {
				apiTypes {
					type
					url
				}
				apiSchemas {
					model {
						_id
						name
					}
					methods {
						name
						pathname
						active
						public
					}
				}
			}
		}
	}
`

export const SEARCH_USER_QUERY = gql`
	query ($input: SearchUserInput!) {
		searchUser(input: $input) {
			_id
			email
			avatar
		}
	}
`

export const GET_MEMBERS_BY_APP = gql`
	query ($input: GetMembersByAppInput!) {
		getMembersByApp(input: $input) {
			_id
			user {
				_id
				email
				avatar
			}
			role
			status
		}
	}
`
export const useGetMembersByApp = (options?: QueryHookOptions) => {
	const result = useQuery<{ getMembersByApp: IMember[] }>(
		GET_MEMBERS_BY_APP,
		options
	)
	return useMemo(() => {
		return { ...result, data: result.data?.getMembersByApp }
	}, [result])
}

export const GET_APP_INVITE_QUERY = gql`
	query {
		getAppInvite {
			_id
			name
			user {
				_id
				email
				avatar
			}
		}
	}
`

export const useGetAppInvite = (options?: QueryHookOptions) => {
	const result = useQuery<{ getAppInvite: IApp[] }>(GET_APP_INVITE_QUERY)
	return useMemo(() => {
		return { ...result, data: result.data?.getAppInvite }
	}, [result])
}
