import { atom } from "recoil";

export const reactionsAtom = atom<string[]>({
    key:'reactions', 
    default: []
})