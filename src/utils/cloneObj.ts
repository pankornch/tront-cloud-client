const cloneObj = <T = any>(arg: any): T => JSON.parse(JSON.stringify(arg))

export default cloneObj
