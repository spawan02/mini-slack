import { atom } from "recoil";


const prevMessage = atom<string[]>({
    key: "prevMessage",
    default:[]
})