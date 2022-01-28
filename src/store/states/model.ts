import { IModel } from "@/src/types"
import { atom } from "recoil"

export const MODELS_STATE = atom<IModel[]>({
	key: "MODELS_STATE",
	default: [],
})
