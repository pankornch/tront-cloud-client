const useErrorText = <T>(formik: any) => {
	return (key: keyof T | string) => {
		return formik.touched[key] ? formik.errors[key] : undefined
	}
}

export default useErrorText
