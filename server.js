// server.js
const express = require('express');
const next = require('next');
const { WebSocketServer } = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Create HTTP server for WebSocket
    const httpServer = server.listen(3000, (err) => {
        if (err) throw err;
        console.log('Ready on http://localhost:3000');
    });

    // WebSocket server
    const wss = new WebSocketServer({ noServer: true });

    // Handle WebSocket upgrade requests
    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });

    // WebSocket connection handling
    wss.on('connection', (ws) => {
        console.log('WebSocket connected');
        ws.on('error', (error)=>{
            console.error('websocket error: ', error)
        })
        ws.on('message', (data, isBinary) => {
            console.log('Received: %s', data);
            // Echo the message back to all clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });

        ws.send('Hello! Message from server');
    });

    // Handle all other requests with Next.js
    server.all('*', (req, res) => {
        return handle(req, res);
    });
});
