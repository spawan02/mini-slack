
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { AtSign, Bold, ClipboardCheck, Code, Italic, Link, List, ListOrdered, Mic, Paperclip, Quote, Send, Smile, Video } from "lucide-react"
import { useRef, useState } from "react"
import { Input } from "./ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import EmojiPicker, { EmojiStyle } from "emoji-picker-react"
import Tooltip from "./Tooltip"
import { useRecoilState } from "recoil"
import { currentChannelAtom } from "@/store/atoms/currentChannel"
import { valueAtom } from "@/store/atoms/value"
import axios from "axios"
import { messageAtom } from "@/store/atoms/Messages"

interface inputProps {
    userId: number,
    isConnected: boolean,
    handleSendMessage: (value: string) => void
}
const InputForm = ({ handleSendMessage, userId, isConnected }: inputProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [value, setValue] = useRecoilState(valueAtom)
    const [messages, setMessages] = useRecoilState(messageAtom)

    const [currentChannel] = useRecoilState(currentChannelAtom)
    const onSubmit = (e: any) => {
        e.preventDefault()
        handleSendMessage(value)
        // sendMessage(value)
    }
    // const handleSendMesssage = async () => {
    //     const channelId = currentChannel.id

    //     const response = await axios.post(`/api/channels/${channelId}/messages/`, {
    //         content: value,
    //         userId: userId
    //     })
    //     // if (response) {

    //     //     console.log(messages)
    //     // }
    //     // setMessages((prev) => [...prev, response.data])

    //     setValue('')
    // }

    const handleFormatChange = (format: string) => {
        const textarea = document.getElementById('message-input') as HTMLTextAreaElement
        if (!textarea) return;
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const selectedText = value.substring(start, end)
        if (!selectedText) return;
        let formattedText = ''
        switch (format) {
            case 'bold':
                formattedText = `*${selectedText}*`
                break
            case 'italic':
                formattedText = `_${selectedText}_`
                break
            case 'link':
                formattedText = `<${selectedText}>`
                break
            case 'code':
                formattedText = `\`${selectedText}\``
                break
            default:
                formattedText = selectedText
        }


        const newValue = value.substring(0, start) + formattedText + value.substring(end)
        setValue(newValue);
        textarea.focus();
        textarea.setSelectionRange(start, start + formattedText.length)
    }
    return (
        <form onSubmit={onSubmit}>
            <div className='flex items-center space-x-2 pb-2'>
                <Tooltip label={"Italic"} icon={<Italic className="h-4 w-4" />} handleFormat={handleFormatChange} />
                <Tooltip label={"Bold"} icon={<Bold className="h-4 w-4" />} handleFormat={handleFormatChange} />
                <Tooltip label={"Link"} icon={<Link className="h-4 w-4" />} handleFormat={handleFormatChange} />
                <Tooltip label={"Code"} icon={<Code className="h-4 w-4" />} handleFormat={handleFormatChange} />
                <Tooltip label={"Attach file"} icon={<Paperclip className="h-4 w-4" />} handleFormat={handleFormatChange} />

            </div>
            <div className="flex items-center space-x-2 pb-2">
                <Input
                    id="message-input"
                    placeholder={`Message #${currentChannel?.name}`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setIsExpanded(true)}
                    className="flex-1"
                />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Smile className="h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <EmojiPicker
                            onEmojiClick={(emojiObject) => setValue(value + emojiObject.emoji)}
                            emojiStyle={EmojiStyle.NATIVE}

                            width="100%"
                            height={350}
                        />
                    </PopoverContent>
                </Popover>
                <Button type="submit" disabled={!isConnected}>
                    <Send className="h-4 w-4" />
                </Button>
            </div>
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between"
                >
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <AtSign className="h-4 w-4 mr-1" />
                            Mention
                        </Button>
                        <Button variant="outline" size="sm">
                            <List className="h-4 w-4 mr-1" />
                            Bullet List
                        </Button>
                        <Button variant="outline" size="sm">
                            <ListOrdered className="h-4 w-4 mr-1" />
                            Numbered List
                        </Button>
                        <Button variant="outline" size="sm">
                            <Quote className="h-4 w-4 mr-1" />
                            Quote
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon">
                            <Mic className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Video className="h-4 w-4" />
                        </Button>
                    </div>
                </motion.div>
            )}
        </form>
    )
}

export default InputForm