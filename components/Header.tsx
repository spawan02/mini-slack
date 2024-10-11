import React from 'react'
import { Button } from './ui/button'
import { Hash, LogOut, Menu, Search, SearchIcon } from 'lucide-react'
import { useRecoilState } from 'recoil'
import { searchQueryAtom } from '@/store/atoms/searchquery'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { User } from '@/types/channel.types'

interface headerProps {
    currentChannel?: string,
    handleLogout: () => void,
    toggleSidebar: () => void
    user?: User | null,
}

const Header = ({ user, currentChannel, handleLogout, toggleSidebar }: headerProps) => {
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryAtom)
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
                <div className="flex items-center space-x-4">
                    <div className='relative -space-x-2 gap-2'>
                        <Input
                            type="search"
                            placeholder="Search messages..."
                            className="pl-8 pr-4 py-2 rounded-full bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <Popover>
                        <PopoverTrigger>
                            <Avatar>
                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.name}`} />
                                <AvatarFallback>{user?.name.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className=''>
                            <Button variant="ghost" onClick={handleLogout} className='bg-gray-500'>
                                <LogOut className='h-6 w-6  pr-1' />
                                LogOut
                            </Button>
                        </PopoverContent>
                    </Popover>
                </div>
            </header>
        </div>
    )
}

export default Header