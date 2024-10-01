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
        <div className={`flex items-center hover:bg-gray-700 p-2 text-xl font-semibold cursor-pointer ${isActive ? `bg-gray-800` : `hover:bg-gray-500`}`}
            onClick={onClickChange}>
            <Hash size={18} className='mr-2' />
            <span>{name}</span>
        </div>
    )
}

export default Channel