const apiUrl = (url: string, modelName?: string) => {
	if (!process.browser) return ""

	const clientUrl = `${location.protocol}//${location.host}`

	const baseUrl = url.replace(
		process.env.NEXT_PUBLIC_BASE_URL_API!,
		clientUrl + "/api"
	)

	return baseUrl + "/" + (modelName || "")
}

export default apiUrl
