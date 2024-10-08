  
  export interface Channel {
    id: number
    name: string
    messages?: Message[]
  }
  
  
  
export interface Message {
    userId: number
    user: string
    content: string
    reactions?: { [key:string]: number }
    timestamp: string
    replies?: Message[]
  }
  export interface User {
    name?: string;
    email: string;
  }
