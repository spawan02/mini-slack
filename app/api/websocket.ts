import express from "express"
import { WebSocketServer } from "ws"


const app = express()
const httpServer = app.listen(4000)

const wss = new WebSocketServer({server:httpServer})
wss.on('connection',(ws)=>{
    console.log("websocket connected")
    ws.on('message',(data)=>{
        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                client.send(data)
            }
        })
    })
    ws.send("Hello! message from server")
})
