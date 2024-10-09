import React from 'react'
import { Button } from './ui/button'
import { Hash, LogOut, Menu } from 'lucide-react'

interface headerProps {
    currentChannel?: string,
    handleLogout: () => void,
    toggleSidebar: () => void
}

const Header = ({ currentChannel, handleLogout, toggleSidebar }: headerProps) => {
    return (
        <div>
            <header className="bg-white  border-b border-gray-200 flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
                        <Menu className="h-6 w-6" />
                    </Button>
                    <h2 className="text-xl font-semibold flex items-center">
                        <Hash width={20} height={20} className='pr-2' />
                        {currentChannel}
                    </h2>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className='h-6 w-6  pr-1' />
                    LogOut
                </Button>
            </header>
        </div>
    )
}

export default Header