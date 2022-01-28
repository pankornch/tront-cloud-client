import { IApiSchema } from "@/src/types"
import { atom } from "recoil"

export const APIS_STATE = atom<IApiSchema[]>({
	key: "APIS_STATE",
	default: [],
})
