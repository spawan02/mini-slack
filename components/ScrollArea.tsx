import { ScrollAreaScrollbar } from '@radix-ui/react-scroll-area'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import React from 'react'

const ScrollArea = () => {
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
                    <Avatar></Avatar>
                </div>
            }
        </ScrollArea>
    )
}

export default ScrollArea