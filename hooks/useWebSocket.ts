import { useState, useEffect, useCallback } from 'react'
import { useToast } from './use-toast'

export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const {toast} = useToast()

  useEffect(() => {
    const ws = new WebSocket(url)
    ws.onopen = () => {
      setIsConnected(true)
      console.log('ws',isConnected)
        setError(null)
        toast({
          title: 'Connected!',
          description: 'WebSocket connection established.',
        });

    }
    ws.onclose = (e) => {
      console.log('Disconnected from WebSocket')
      setIsConnected(false)
    }
    
    ws.onerror = (event) => {
      console.error('WebSocket error')
      setError('WebSocket connection error')
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "There was a problem with your request.",
      })
    }
    
    setSocket(ws)
       
    return () => {
      ws.close()
    }
  }, [url])

  
  const sendMessage = useCallback(
     (message: string) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message)
        }

     else {
        console.error('WebSocket is not connected')
      } 
    },
    [socket]
  )
  

  return { socket, isConnected, error, sendMessage }
}



