  
  export interface Channel {
    id: number
    name: string
    messages?: Message[]
  }
  
  
  
export interface Message {
    id: number,
    userId: number
    user: string
    content: string
    reactions: Reaction[]
    timestamp: string
    replies?: Message[]
  }

export interface Reaction {
  emoji:string, 
  count: number
}
  export interface User {
    id: number;
    name?: string;
    email: string;
  }
