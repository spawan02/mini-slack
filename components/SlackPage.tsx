"use client"
import React, { useState } from 'react'
import Channel from './Channel';
import Message from './Message';
import { Input } from './ui/input';
import { Send } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const SlackPage = () => {
    const router = useRouter()
    const session = useSession()
    const [activeChannel, setActiveChannel] = useState<any>('general');
    const [newMessage, setNewMessage] = useState<any>('');
    const [messages, setMessages] = useState<any>({
        general: [
            { user: 'Alice', content: 'Hello everyone!' },
            { user: 'Bob', content: 'Hi Alice, how are you?' },
        ],
        random: [
            { user: 'Charlie', content: 'Anyone up for lunch?' },
        ],
    });
    const sendMessage = () => {
        if (newMessage.trim()) {
            //@ts-expect-error: known to fail in certain condition
            setMessages(prev => ({
                ...prev,
                [activeChannel]: [...prev[activeChannel], { user: 'You', content: newMessage }],
            }));
            setNewMessage('');
        }
    };
    const handleChannelChange = (channel: string) => {
        setActiveChannel(channel)
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value)
    }
    console.log(session.data?.user)
    return (
        <div className='flex h-screen bg-gray-800 text-white'>
            <div>
                {session.data?.user &&
                    (
                        <button className='bg-blue-400 text-white' onClick={async () => {
                            await signOut()
                            router.push("/api/auth/signin")
                            console.log("signout")
                        }}>
                            Signout
                        </button>
                    )}

            </div>
            <div className='w-64 bg-gray-900 p-4'>
                <h2 className='text-xl font-bold mb-4'>Channels </h2>
                <Channel name="general" isActive={activeChannel === "general"} onClickChange={() => handleChannelChange("general")} />
                <Channel name="random" isActive={activeChannel === "random"} onClickChange={() => handleChannelChange("random")} />
            </div>
            <div className='flex-1 flex flex-col'>
                <div className='p-4 border-b border-gray-700'>
                    <h2 className='text-xl font-bold'>#{activeChannel}</h2>
                </div>
                <div className='flex-1 overflow-y-auto p-4'>
                    {
                        //@ts-expect-error: Know to fail in certain condition mismatch
                        messages[activeChannel].map((msg, index) => {
                            <Message key={index} user={msg.user} content={msg.content} />
                        })}
                </div>
                <div className='p-4 border-t border-gray-400 flex'>
                    <Input type='text' placeholder='Type a message' value={newMessage} onChange={handleInputChange} onKeyDown={sendMessage} className='flex-grow mr-2 bg-gray-700 text-white' />
                    <button type='submit' onClick={sendMessage} className='bg-blue-500 hover:bg-blue-600'>
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SlackPage