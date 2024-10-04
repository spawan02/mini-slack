import { atom } from "recoil";


export const prevMessageAtom = atom<string[]>({
    key: "prevMessage",
    default:[]
})
