import { Hash } from 'lucide-react'
import React from 'react'

// type onClickChange = () =>void
interface channelProps {
    isActive: boolean,
    name: string,
    onClickChange: () => void
}
const Channel = ({ isActive, name, onClickChange }: channelProps) => {
    return (
        <div className={`flex items-center p-2 cursor-pointer ${isActive ? `bg-gray-800` : `hover:bg-gray-500`}`}
            onClick={onClickChange}>
            <Hash size={18} className='mr-2' />
            <span>{name}</span>
        </div>
    )
}

export default Channel