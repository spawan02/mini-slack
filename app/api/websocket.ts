// import { Server } from 'ws'
// import { NextApiRequest, NextApiResponse } from 'next'

// const websocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
    
//     if (!res.socket.server.wss) {
//     console.log('WebSocket server is already running')
//     res.end()
//     return
//   }

//   console.log('Setting up WebSocket server')
//     const wss = new Server({ noServer: true })
//   res.socket.server.ws = wss

//   wss.on('connection', (ws) => {
//     console.log('New client connected')

//     ws.on('message', (message: string) => {
//       console.log('Received message:', message)
//       wss.clients.forEach((client) => {
//         if (client !== ws && client.readyState === WebSocket.OPEN) {
//           client.send(message)
//         }
//       })
//     })

//     ws.on('close', () => {
//       console.log('Client disconnected')
//     })
//   })

//   res.socket.server.on('upgrade', (request, socket, head) => {
//     wss.handleUpgrade(request, socket, head, (ws) => {
//       wss.emit('connection', ws, request)
//     })
//   })

//   res.end()
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// export default websocketHandler