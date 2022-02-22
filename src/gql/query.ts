import { gql } from "@apollo/client"

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
