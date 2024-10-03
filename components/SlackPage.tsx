"use client"
import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu, Send } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useWebSocket } from '@/hooks/useWebSocket'
import Header from './Header'
import { useRecoilState } from 'recoil'
import { currentChannelAtom } from '@/store/atoms/currentChannel'
import SideBarItem from './SideBarItem'

const channels = [
    { id: 1, name: 'general' },
    { id: 2, name: 'random' },
]


export default function SlackPage() {

    const router = useRouter()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [currentChannel, setCurrentChannel] = useRecoilState(currentChannelAtom);
    const [messages, setMessages] = useState<string[]>([])
    const [prevMessage, setPrevMessage] = useState<string[]>([])
    const [value, setValue] = useState('')
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const { socket, isConnected, error, sendMessage, userMessages } =
        useWebSocket(`ws://localhost:4000`)
    const session = useSession()
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    useEffect(() => {
        if (userMessages) {
            setPrevMessage(userMessages)

        }
    }, [userMessages])

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                setMessages((prevMessages) => [...prevMessages, event.data])
            }
        }
    }, [socket])

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }, [messages])

    const handleLogout = async () => {
        await signOut()
        router.push("/api/auth/signin")
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isConnected) {
            sendMessage(value)
            setValue('')
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return (
        <div className="flex h-screen bg-gray-100 text-gray-900">
            <aside className={`bg-gray-800 text-white w-54 flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>{
                isSidebarOpen && <SideBarItem channel={channels} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
                <nav className="p-2 flex ">
                    <ul>

                        <Button variant="ghost" size="icon" className=" mr-2" onClick={toggleSidebar}>
                            <Menu className="h-6 w-6" />
                        </Button>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 flex flex-col">
                <Header currentChannel={currentChannel} handleLogout={handleLogout} toggleSidebar={toggleSidebar} />

                <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
                    {
                        !userMessages && (<div>
                            ...loading
                        </div>
                        )}
                    {prevMessage.map((message, index) => (
                        <div key={index}>
                            {message}
                        </div>
                    ))}
                    {messages.map((message, index) => (
                        <div className="flex items-start mb-4">

                            <div key={index} className="mb-2">
                                {session.data?.user?.name || "user: "}
                                {message}
                            </div>
                        </div>
                    ))}
                </ScrollArea>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">

                        <Input
                            type="text"
                            placeholder={`Message #${currentChannel}`}
                            value={value}
                            onChange={handleInputChange}
                            className="flex-grow"

                        />
                        <Button type="submit" size="icon" disabled={!value}>
                            <Send className='h-6 w-4' />
                        </Button>
                    </div>
                </form>
            </main>
        </div >
    )
}