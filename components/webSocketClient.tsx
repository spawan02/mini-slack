// import useWebSocket from '@/app/hooks/useWebSocket'
// import React, { useEffect, useState } from 'react'

// const WebSocketClient = () => {
//     const socket = useWebSocket("ws://localhost:3000")
//     const [message, setMessage] = useState<string[]>([])
//     const [value, setValue] = useState("")
//     const sendMessage = () => {
//         if (socket) {
//             socket.send("Hello from client!");
//         }
//     };

//     if (!socket) {
//         return <div className='flex justify-center items-center h-screen text-2xl '>
//             connecting to a socket server...
//         </div>
//     }

//     const handleChange = (e: any) => {
//         setValue(e.target.value)
//     }
//     console.log(value)
//     return (
//         <div>
//             <input type="text" placeholder="what's in your mind" onChange={handleChange} />
//             <button onClick={() => sendMessage}>Send</button>
//             {message}
//         </div>
//     )
// }

// export default WebSocketClient

"use client"
import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useWebSocket } from '@/hooks/useWebSocket'
import { useSession } from 'next-auth/react'


export default function Chat() {
    const [messages, setMessages] = useState<string[]>([])
    const [inputMessage, setInputMessage] = useState('')
    const [prevMessage, setPrevMessage] = useState<string[]>([])
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const { socket, isConnected, error, sendMessage, userMessages } = useWebSocket(`ws://localhost:4000`)
    const session = useSession()

    useEffect(() => {
        setPrevMessage(userMessages)
        if (socket) {
            socket.onmessage = (event) => {
                setMessages((prevMessages) => [...prevMessages, event.data])
            }
        }
    }, [socket])

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }, [messages])
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputMessage.trim() && isConnected) {
            sendMessage(inputMessage)

            // setMessages((prevMessages) => [...prevMessages, inputMessage])
            setInputMessage('')
        }

    }
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Real-time Chat</h1>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            {!isConnected && !error && <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">Connecting to WebSocket...</div>}
            <ScrollArea className="flex-grow mb-4 p-4 border rounded-md" ref={scrollAreaRef}>
                {
                    !userMessages && <div>
                        ...loading
                    </div>
                }
                {prevMessage.map((message, index) => (
                    <div>
                        {message}
                    </div>
                ))}
                {messages.map((message, index) => (
                    <div key={index} className="mb-2">
                        {session.data?.user?.name || "user: "}
                        {message}
                    </div>
                ))}
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow"
                    disabled={!isConnected}
                />
                <Button type="submit" disabled={!isConnected}>Send</Button>
            </form>
        </div>
    )
}