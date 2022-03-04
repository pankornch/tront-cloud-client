const apiUrl = (url: string, modelName?: string) => {
	if (!process.browser) return ""
	
	const clientUrl = `${location.protocol}//${location.host}`

	return (
		url.replace(process.env.NEXT_PUBLIC_BASE_URL_API!, clientUrl) +
		`/${modelName || ""}`
	)
}

export default apiUrl
