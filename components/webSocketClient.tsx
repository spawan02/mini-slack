"use client"
import useWebSocket from '@/app/hooks/useWebSocket'
import React, { useEffect, useState } from 'react'

const webSocketClient = () => {
    const socket = useWebSocket("ws://localhost:4000")
    const [message, setMessage] = useState<string[]>([])
    const [value, setValue] = useState("")
    useEffect(() => {
        if (socket) {
            socket.onmessage = (message) => {
                setMessage((m) => [...m, message.data])
            }
        }

    }, [socket])
    if (!socket) {
        return <div>
            connecting to a socket server...
        </div>
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return (
        <div>
            <input type="text" placeholder="what's in your mind" onChange={handleChange} />
            <button type='submit' onClick={() => socket?.send(value)}>Send</button>
            {message}
        </div>
    )
}

export default webSocketClient