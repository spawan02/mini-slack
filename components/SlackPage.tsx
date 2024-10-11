"use client"
import React, { FormEvent, ReactEventHandler, useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, Send } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useWebSocket } from '@/hooks/useWebSocket'
import Header from './Header'
import { useRecoilState } from 'recoil'
import { currentChannelAtom } from '@/store/atoms/currentChannel'
import SideBarItem from './SideBarItem'
import { valueAtom } from '@/store/atoms/value'
import { messageAtom } from '@/store/atoms/Messages'
import InputForm from './InputForm'
import MessageItem from './Messageitem'
import axios from 'axios'
import { Channel, Message, User } from '@/types/channel.types'
import { ScrollArea } from './ui/scroll-area'
import { replyingToAtom } from '@/store/atoms/replyingTo'
import { currentUser } from '@/lib/api'
import { Skeleton } from './ui/skeleton'
import { searchQueryAtom } from '@/store/atoms/searchquery'

// const channels = [
//     { id: 1, name: 'general' },
//     { id: 2, name: 'random' },
// ]

//figure out why messageprops as passed
interface messageProp {
    content: string,
    reactions: string | null,
    userId: number,
    timeStamp: Date,
    id: number
}
const SlackPage = () => {

    const router = useRouter()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [currentChannel, setCurrentChannel] = useRecoilState(currentChannelAtom);
    const [messages, setMessages] = useRecoilState(messageAtom)
    const [value, setValue] = useRecoilState(valueAtom)
    const [channel, setChannels] = useState<Channel[]>([])
    const [userId1, setUserId] = useState(0)
    const [user, setUser] = useState<User | null>(null)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryAtom)
    const [replyingTo, setReplyingTo] = useRecoilState(replyingToAtom)
    const { socket, isConnected, sendMessage } =
        useWebSocket('ws://localhost:4000')
    const [isLoading, setIsLoading] = useState(true)
    const session = useSession()
    let user1: any;
    let userId: number = 0;
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }
    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                setMessages((prevMessages) => [...prevMessages, event.data])
            }
        }
    }, [messages])

    useEffect(() => {
        const fetchData = async () => {
            const email = session.data?.user?.email
            try {
                if (email != undefined) {

                    const userRespone = await axios.get(`/api/user/me/?email=${email}`)
                    if (userRespone.data && userRespone.data.user) {
                        user1 = await userRespone.data.user
                        setUser(user1)
                        userId = await user1.id
                        setUserId(userId)
                        const channelsResponse = await axios.get(`/api/channels?userId=${userId}`)
                        setChannels(channelsResponse.data)
                        // console.log(channelsResponse.data)
                        if (channelsResponse.data.length > 0) {
                            setCurrentChannel(channelsResponse.data[0])
                        }
                    }
                }
            } catch (e) {
                console.log(e)
                // console.error("error fetching channels")
            } finally {
                setIsLoading(false)
            }

        }
        fetchData()
    }, [isConnected])
    useEffect(() => {
        try {
            if (currentChannel) {
                const fetchMessage = async () => {
                    const response = await axios.get(`/api/channels/${currentChannel.id}/messages`);
                    setMessages(response.data);
                }
                fetchMessage()
            }
        } catch (e) {
            console.error(e)
        }

    }, [currentChannel])

    const handleLogout = async () => {
        await signOut()
        router.push("/api/auth/signin")
    }

    const handleReaction = async (messageId: number, emoji: string) => {
        const response = await axios.post(`/api/messages/${messageId}/reactions`, {
            emoji,
            userId: userId1
        })
        const newReaction = await response.data;
        setMessages((prevMessages) => prevMessages.map((msg) =>
            msg.userId === messageId
                ? {
                    ...msg,
                    reactions: [
                        ...msg.reactions.filter(r => r.emoji !== emoji),
                        newReaction
                    ]
                }
                : msg
        ))
    }
    const filteredMessages = messages.filter(msg => {
        if (msg && msg.content) {
            return (
                msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        return false
    })

    const handleSendMessage = async (value: string) => {
        sendMessage(value)
        const response = await axios.post(`/api/channels/${currentChannel.id}/messages/`, {
            content: value,
            userId: userId1
        })
        console.log(response.data)
        setMessages((prev) => [...prev, response.data])
        setValue('')
    }
    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue(e.target.value)
    // }
    return (
        <div className="flex h-screen bg-gray-100 text-gray-900 overflow-hidden">
            <aside className={`bg-gray-800 text-white w-54 flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>{
                isSidebarOpen && <SideBarItem channel={channel} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} userId={userId1} />}
                <nav className="p-2 flex ">
                    <ul>
                        <Button variant="ghost" size="icon" className=" mr-2" onClick={toggleSidebar}>
                            <Menu className="h-6 w-6" />
                        </Button>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 flex flex-col">
                <Header currentChannel={currentChannel?.name} handleLogout={handleLogout} toggleSidebar={toggleSidebar} user={user} />

                <ScrollArea className="flex-1 p-4">
                    <AnimatePresence>
                        {
                            isLoading ? (
                                <div className="flex flex-col justify-center items-center h-screen">
                                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                    <div className="space-y-2 py-2">
                                        <Skeleton className="h-4 w-[250px]" />
                                        <Skeleton className="h-4 w-[250px]" />
                                    </div>
                                </div>
                            )
                                : filteredMessages.map((message) => (
                                    <MessageItem
                                        key={message.id}
                                        message={message}
                                        onReaction={handleReaction}
                                        onReply={() => setReplyingTo(message)}
                                        user={user}
                                    />
                                ))
                        }
                    </AnimatePresence>
                </ScrollArea>

                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="p-4 border-t bg-white"
                >
                    <InputForm userId={userId1} isConnected={isConnected} handleSendMessage={handleSendMessage} />
                </motion.div>
            </main>
        </div >
    )
}

export default SlackPage