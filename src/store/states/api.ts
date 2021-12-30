import { MOCK_API_SCHEMAS } from "@/src/mock"
import { IApiSchema } from "@/src/types"
import { atom } from "recoil"

export const APIS_STATE = atom<IApiSchema[]>({
	key: "APIS_STATE",
	default: MOCK_API_SCHEMAS,
})
