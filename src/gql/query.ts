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
		}
	}
`
