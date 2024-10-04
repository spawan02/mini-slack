
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { AtSign, Bold, Code, Italic, Link, List, ListOrdered, Mic, Paperclip, Quote, Send, Smile, Video } from "lucide-react"
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

const InputForm = (handleClick: any) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [value, setValue] = useRecoilState(valueAtom)
    const [currentChannel] = useRecoilState(currentChannelAtom)

    return (
        <form>
            <div className='flex items-center space-x-2 pb-2'>
                <Tooltip label={"Bold"} icon={<Bold className="h-4 w-4" />} />
                <Tooltip label={"Italic"} icon={<Italic className="h-4 w-4" />} />
                <Tooltip label={"Link"} icon={<Link className="h-4 w-4" />} />
                <Tooltip label={"Code"} icon={<Code className="h-4 w-4" />} />
                <Tooltip label={"Attach file"} icon={<Paperclip className="h-4 w-4" />} />

            </div>
            <div className="flex items-center space-x-2 pb-2">
                <Input
                    placeholder={`Message #${currentChannel}`}
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
                <Button type="submit" onClick={handleClick}>
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