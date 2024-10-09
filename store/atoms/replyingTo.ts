import { Message } from "@/types/channel.types";
import { atom } from "recoil";

export const replyingToAtom =atom<Message|null>({
    key:'replyingTo',
    default:null
})