import { atom } from "recoil";


interface Channel{
    id: number, 
    name: string,
    _count?:{
        messages:number
    }
}
export const currentChannelAtom = atom<Channel|null>({
    key:"channel",
    default: null
})