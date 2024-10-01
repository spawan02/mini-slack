"use client"
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Hash, Menu, Send, Plus, ChevronDown, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Channel from './Channel'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useWebSocket } from '@/hooks/useWebSocket'
import { getMessages } from '@/actions/getMessages.actions'


const channels = [
    { id: 1, name: 'general' },
    { id: 2, name: 'random' },
    { id: 3, name: 'project-alpha' },
    { id: 4, name: 'help-desk' },
]

// const messages = [
//     { id: 1, user: 'Alice', content: 'Hey everyone! How\'s it going?', timestamp: '10:00 AM' },
//     { id: 2, user: 'Bob', content: 'Pretty good, thanks! How about you?', timestamp: '10:05 AM' },
//     { id: 3, user: 'Charlie', content: 'I\'m doing great! Just finished a big project.', timestamp: '10:10 AM' },
//     { id: 4, user: 'Alice', content: 'That\'s awesome, Charlie! Congrats!', timestamp: '10:12 AM' },
//     { id: 5, user: 'David', content: 'Hey all, quick question - has anyone used the new API?', timestamp: '10:20 AM' },
//     { id: 6, user: 'Eve', content: 'Yes, I have! It\'s pretty straightforward. What do you need help with?', timestamp: '10:25 AM' },
// ]

export default async function SlackPage() {

    const router = useRouter()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [currentChannel, setCurrentChannel] = useState(channels[0])
    const [newMessage, setNewMessage] = useState<string[]>([])
    const [value, setValue] = useState("")
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
    const { socket, isConnected, error, sendMessage } =
        useWebSocket(`ws://localhost:4000`)

    useEffect(() => {
        if (socket) {
            console.log("inside socket")
            socket.onmessage = (event) => {
                setNewMessage((prevMessages) => [...prevMessages, event.data])
            }
        }
    }, [socket])

    const handleLogout = async () => {
        await signOut()
        router.push("/api/auth/signin")
    }
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (value.trim() && isConnected) {
            sendMessage(value)
            setValue('')
        }
    }

    return (
        <div className="flex h-screen bg-gray-100 text-gray-900">
            <h1 className="text-2xl font-bold mb-4">Real-time Chat</h1>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            {!isConnected && !error && <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">Connecting to WebSocket...</div>}
            {/* Sidebar */}
            <aside className={`bg-gray-800 text-white w-54 flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
                <div className="p-4 border-b border-gray-700">
                    <Link href={"/home"}>
                        <h1 className="text-2xl font-bold">Slack Clone</h1>
                    </Link>
                </div>
                <nav className="p-2 flex ">
                    <ul>
                        {channels.map(channel => (
                            <li key={channel.id} className='font-sans'>
                                {/* <Button
                                    variant="ghost"
                                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
                                >
                                    <Hash className="mr-2 h-4 w-4" />
                                    {channel.name}
                                </Button> */}
                                <Channel name={channel.name} isActive={true} onClickChange={() => setCurrentChannel(channel)} />
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white  border-b border-gray-200 flex items-center justify-between p-4">
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
                            <Menu className="h-6 w-6" />
                        </Button>
                        <h2 className="text-xl font-semibold flex items-center">
                            <Hash className="mr-2 h-5 w-5" />
                            {currentChannel.name}
                        </h2>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                        <LogOut className='h-6 w-6 pr-1' />
                        LogOut
                    </Button>
                </header>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                    {messages.map(message => (
                        <div className="flex items-start mb-4">
                            <Avatar className="mr-2">
                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.user}`} alt={message.content} />
                                <AvatarFallback>{"test"}</AvatarFallback>
                            </Avatar>
                            <div>
                                {/* <div className="flex items-center">
                                    <span className="font-semibold mr-2">{message.user}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{message.timestamp}</span>
                                </div> */}
                                <p className="text-sm mt-1">{message.content}</p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <Input
                            type="text"
                            placeholder={`Message #${currentChannel.name}`}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit" size="icon">
                            <Send className='h-6 w-4' />
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    )
}