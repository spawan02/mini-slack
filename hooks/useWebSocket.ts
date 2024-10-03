import { getMessages } from '@/actions/getMessages.actions'
import { createMessage } from '@/actions/message.actions' 
import { useState, useEffect, useCallback } from 'react'
import { useToast } from './use-toast'

export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userMessages, setUserMessages ] = useState<string[]>([])
  const {toast} = useToast()
  useEffect(() => {
    const ws = new WebSocket(url)
    ws.onopen = () => {
      console.log('Connected to WebSocket')
      setIsConnected(true)
      setError(null)
      toast({
        title: 'Connected!',
        description: 'WebSocket connection established.',
    });
   
    }
    ws.onclose = () => {
      console.log('Disconnected from WebSocket')
      setIsConnected(false)
    }
    
    ws.onerror = (event) => {
      console.error('WebSocket error:', event)
      setError('WebSocket connection error')
    }
    
    setSocket(ws)
    getMessage()    
    return () => {
      ws.close()
    }
  }, [url])

  const getMessage =async()=>{
    const mess = await getMessages()
    setUserMessages(mess)
  }
  const sendMessage = useCallback(
     (message: string) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message)
        createMessage(message)
        }

     else {
        console.error('WebSocket is not connected')
      } 
    },
    [socket]
  )

  return { socket, isConnected, error, sendMessage, userMessages }
}