import { Message } from "@/types/channel.types"
import { atom } from "recoil"


export const messageAtom = atom<Message[]>({
    key: "message",
    default: []
})