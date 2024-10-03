import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Hash, Plus, X } from 'lucide-react'
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input'
import { useRecoilState } from 'recoil'
import { currentChannelAtom } from '@/store/atoms/currentChannel'

interface Channel {
    id: number
    name: string
}

interface sideBarProps {
    isSidebarOpen: boolean,
    toggleSidebar: () => void,
    channel: Channel[]
}

const SideBarItem = ({ channel, isSidebarOpen, toggleSidebar }: sideBarProps) => {
    const [channels, setChannels] = useState<Channel[]>(channel)
    const [currentChannel, setCurrentChannel] = useRecoilState(currentChannelAtom);

    const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false)
    const [newChannelName, setNewChannelName] = useState('')

    const handleCreateChannel = () => {
        if (newChannelName.trim()) {
            const newChannel: Channel = {
                id: channels.length + 1,
                name: newChannelName.trim(),
            }
            setChannels([...channels, newChannel])
            setNewChannelName('')
            setIsCreateChannelOpen(false)
        }
    }

    const handleChannelSelect = (channel: Channel) => {
        setCurrentChannel(channel.name)
        if (!(window.innerWidth >= 750)) {
            toggleSidebar()
        }
    }

    return (
        <div>
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="bg-gray-800 text-white w-64 flex-shrink-0 fixed h-full z-50 md:relative md:translate-x-0"
                    >
                        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                            <h1 className="text-2xl font-bold">NeoSlack</h1>
                            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                        <ScrollArea className="h-[calc(100vh-5rem)]">
                            <nav className="p-2">
                                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Channels</h2>
                                <ul>
                                    {channels.map(channel => (
                                        <li key={channel.id}>
                                            <div
                                                className={` flex rounded m-2 p-2 text-gray-300 hover:text-white hover:bg-gray-700 ${currentChannel === channel.name ? 'bg-gray-700 text-white' : ''
                                                    }`}
                                                onClick={() => handleChannelSelect(channel)}
                                            >
                                                <Hash className="mr-2 h-4 w-4" />
                                                {channel.name}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <Dialog open={isCreateChannelOpen} onOpenChange={setIsCreateChannelOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 mt-2">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Channel
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Create a new channel</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    value={newChannelName}
                                                    onChange={(e) => setNewChannelName(e.target.value)}
                                                    className="col-span-3"
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={handleCreateChannel}>Create Channel</Button>
                                    </DialogContent>
                                </Dialog>
                            </nav>
                        </ScrollArea>
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SideBarItem