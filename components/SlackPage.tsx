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
    const [searchQuery, setSearchQuery] = useState('')
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
                // setMessages((prevMessages) => [...prevMessages, event.data])
            }
        }
    }, [socket])

    // useEffect(() => {
    //     if (scrollAreaRef.current) {
    //         scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    //     }
    // }, [messages])
    useEffect(() => {
        const fetchData = async () => {
            const email = session.data?.user?.email
            try {
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
    interface InputFormProps {
        handleClick: (e: FormEvent<Element>) => Promise<void>;
    }
    const handleReaction = async (messageId: number, emoji: string) => {
        const response = await axios.post(`/api/messages/${messageId}/reactions`, {
            emoji,
            userId: userId
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
    const filteredMessages = messages.filter(msg =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
    // const handleSendMessage = async () => {

    //     const handle = async () => {

    //         // sendMessage(value)
    //         console.log(value)
    //         // const response = await axios.post(`/api/channels/${currentChannel.id}/messages/`, {
    //         //     content: value,
    //         //     userId: userId
    //         // })
    //         // setMessages((prev) => [...prev, response.data.content])
    //         // setValue('')
    //     }


    // }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return (
        <div className="flex h-screen bg-gray-100 text-gray-900 overflow-hidden">
            <aside className={`bg-gray-800 text-white w-54 flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>{
                isSidebarOpen && <SideBarItem channel={channel} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} userId={userId} />}
                <nav className="p-2 flex ">
                    <ul>
                        <Button variant="ghost" size="icon" className=" mr-2" onClick={toggleSidebar}>
                            <Menu className="h-6 w-6" />
                        </Button>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 flex flex-col">
                <Header currentChannel={currentChannel?.name} handleLogout={handleLogout} toggleSidebar={toggleSidebar} />

                {/* <ScrollAreaComp session={session} messages={messages} /> */}
                <ScrollArea className="flex-1 p-4">
                    <AnimatePresence>
                        {
                            isLoading ? (
                                <div className='text-center items-center font-xl'>...Loading</div>
                            )
                                : filteredMessages.map((message) => (
                                    <MessageItem
                                        key={message.userId}
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
                    <InputForm userId={userId1} isConnected={isConnected} />
                </motion.div>
            </main>
        </div >
    )
}

export default SlackPage