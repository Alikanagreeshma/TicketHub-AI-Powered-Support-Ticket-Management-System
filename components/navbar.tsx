'use client'

import { useState, useEffect } from 'react'
import { Bell, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'

interface NavbarProps {
  userName?: string
  userRole?: string
}

export function Navbar({ userName: propUserName, userRole: propUserRole }: NavbarProps) {
  const [userName, setUserName] = useState(propUserName || 'User')
  const [userRole, setUserRole] = useState(propUserRole || 'User')
  const router = useRouter()

  useEffect(() => {
    // Read from localStorage
    const storedUserName = localStorage.getItem('userName')
    const storedUserRole = localStorage.getItem('userRole')

    if (storedUserName) setUserName(storedUserName)
    if (storedUserRole) setUserRole(storedUserRole)
  }, [])

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userRole')

    alert('Logged out successfully!')
    router.push('/')
  }

  return (
    <nav className="border-b border-border bg-card h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-semibold text-foreground">Support Tickets</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Settings className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">{userRole}</p>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://avatar.vercel.sh/${userName}`} />
            <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  )
}
