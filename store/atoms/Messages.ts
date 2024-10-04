import { atom } from "recoil"


export const messageAtom = atom<string[]>({
    key: "message",
    default: []
})