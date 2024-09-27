import React from 'react'
interface messageProps {
    user: string,
    content: string
}
const Message = ({ user, content }: messageProps) => {
    return (
        <div className='flex items-start mb-4'>
            <div className='bg-blue-500 rounded full w-8 h-8 flex iems-center justify-center mr-2'>
                {user.charAt(0).toUpperCase()}
            </div>
            <div>
                <span>{user}</span>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default Message