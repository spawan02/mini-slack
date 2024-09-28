// import express from "express"
// import { WebSocketServer } from "ws"


// const app = express()
// const httpServer = app.listen(4000,()=>{
//     console.log("server is listening")
// })

// const wss = new WebSocketServer({server:httpServer})
// wss.on('connection',(ws)=>{
//     console.log("websocket connected")
//     ws.on('message',(data)=>{
//         wss.clients.forEach((client)=>{
//             if(client.readyState === WebSocket.OPEN){
//                 client.send(data)
//             }
//         })
//     })
//     ws.send("Hello! message from server")
// })

// server.ts
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        handle(req, res);
    });

    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        console.log('New client connected');

        ws.on('message', (message) => {
            console.log(`Received: ${message}`);
            // Echo the message back to the client
            ws.send(`Server: ${message}`);
        });

        ws.send('Hello! Message from server');
    });

    server.listen(3000, ()=>{
        console.log('> Ready on http://localhost:3000');
    });
});