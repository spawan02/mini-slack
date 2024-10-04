import { ScrollAreaScrollbar } from '@radix-ui/react-scroll-area'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import React, { useRef } from 'react'
import { prevMessageAtom } from '@/store/atoms/previosMessage'
import { useRecoilState } from 'recoil'

const ScrollArea = () => {
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const [prevMessage, setPrevMessage] = useRecoilState(prevMessageAtom)
    return (
        <ScrollAreaScrollbar className="flex-grow p-4" ref={scrollAreaRef}>
            {
                !userMessages && (<div>
                    ...loading
                </div>
                )}
            {prevMessage.map((message, index) => (
                <div key={index}>
                    {session.data?.user?.name}:
                    {message}
                </div>
            ))}
            {messages.map((message, index) => (
                <div key={index} className="flex items-start mb-4">

                    <div className="mb-2">
                        {session.data?.user?.name || "user: "}:
                        {message}
                    </div>
                </div>
            ))}
            {
                <div className='flex space-x-2'>
                    <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.user}`} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                        <div className='flex'>
                            <span className='font-semibold mr-2'>{message.user}</span>
                            <span className='text-xs text-gray-400'></span>
                        </div>

                    </div>
                </div>
            }
        </ScrollArea>
    )
}

export default ScrollArea