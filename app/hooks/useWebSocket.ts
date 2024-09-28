"use client"

import { useEffect, useState } from "react"

const useWebSocket = (url:any):any =>{
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(()=>{
        const socket = new WebSocket(url);
        socket.onopen=()=>{
            setSocket(socket);
        }
        return ()=>{
            socket.close();
        }
    },[url])
    return socket;
}

export default useWebSocket;