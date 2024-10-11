import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import EmojiPicker from "emoji-picker-react";
import { MessageSquare, Smile } from "lucide-react";
import { useRecoilState, useRecoilValue } from "recoil";
import showReplyAtom from "@/store/atoms/ShowReply";
import { currentChannelAtom } from "@/store/atoms/currentChannel";
import { useEffect, useState } from "react";
import { Channel, Message, User } from "@/types/channel.types";
import axios from "axios"
import { messageAtom } from "@/store/atoms/Messages";

interface messageProps {
    message: Message,
    user?: User | null,
    onReaction: (messageId: number, emoji: string) => void,
    onReply: () => void
}



const MessageItem = ({ message, user, onReaction, onReply }: messageProps) => {
    const [showReplies, setShowReplies] = useRecoilState(showReplyAtom)
    const [replyingTo, setReplyingTo] = useState<Message | null>(null)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.1, dealy: 0.1 }}
            className="mb-2"
        >

            <div className="flex items-start">
                <Avatar className="mr-2">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.name}`} />
                    <AvatarFallback>{user?.name}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-baseline">
                        <span className="font-semibold mr-2"> {user?.name}</span>

                    </div>
                    <p className="mt-1">{message.content}</p>
                    <div className="flex items-center mt-2 space-x-2">
                        {message.reactions.map(({ emoji, count }) => (
                            <motion.span
                                key={emoji}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-gray-100 rounded-full px-2 py-1 text-sm cursor-pointer"
                                onClick={() => onReaction(message.id, emoji)}
                            >
                                {emoji} {count}
                            </motion.span>
                        ))}
                        <Popover>
                            <PopoverTrigger>
                                <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacit">
                                    <Smile className="h-4 w-4 mr-1" />

                                    React
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <EmojiPicker
                                    onEmojiClick={(emojiObject) => onReaction(message.id, emojiObject.emoji)}
                                    width={"100%"}
                                    height={350}
                                />
                            </PopoverContent>
                        </Popover>
                        <Button variant="outline" onClick={onReply} className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Reply
                        </Button>
                    </div>
                    {message.replies && message.replies.length > 0 && (
                        <div className="mt-2">
                            <Button variant={"link"} size={"sm"} onClick={() => setShowReplies(!showReplies)}>
                                {showReplies ? 'Hide' : 'Show'}{message.replies.length}{message.replies.length === 1 ? 'reply' : "replies"}
                            </Button>
                            {
                                showReplies && (
                                    <div className="ml-4 mt-2 space-y-2">
                                        {message.replies.map((reply) => (
                                            <MessageItem key={reply.id} message={reply} onReaction={onReaction} onReply={onReply} />
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    )}
                </div>
            </div>
        </motion.div >
    )
}

export default MessageItem