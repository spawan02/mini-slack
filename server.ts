import express from "express"
import { WebSocketServer } from "ws"


const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({server:httpServer})
wss.on('connection',(ws)=>{
    ws.on('message',(data)=>{
        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                client.send(data)
            }
        })
    })
    ws.send("Hello! message from server")
})
