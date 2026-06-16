'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { Badge } from '@/components/ui/badge'
import { Search, Mail, Phone, MapPin } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'support' | 'user'
  phone: string
  location: string
  joinDate: string
  tickets: number
  status: 'active' | 'inactive'
}



export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
  fetchUsers()
}, [])

const fetchUsers = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/users')
    const data = await response.json()

    const formattedUsers = data.map((user: any) => ({
      id: user.user_id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      phone: 'N/A',
      location: 'N/A',
      joinDate: new Date().toISOString(),
      tickets: 0,
      status: 'active'
    }))

    setUsers(formattedUsers)
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      case 'support':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={true} />
      
      <div className="flex-1 overflow-auto">
        <Navbar />
        
        <main className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Users</h1>
            <p className="text-muted-foreground mt-1">Manage team members and support agents</p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, email, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border text-foreground placeholder-muted-foreground"
              />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Add User
            </Button>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.map(user => (
              <Card key={user.id} className="border border-border">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* User Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <Badge className={getStatusBadge(user.status)}>
                        {user.status}
                      </Badge>
                    </div>

                    {/* User Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        {user.phone}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {user.location}
                      </div>
                    </div>

                    {/* Role and Stats */}
                    <div className="flex items-center justify-between py-2 border-t border-border">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Role: </span>
                        <Badge className={getRoleBadge(user.role)}>
                          {user.role}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Tickets: </span>
                        <span className="font-semibold text-foreground">{user.tickets}</span>
                      </div>
                    </div>

                    {/* Join Date */}
                    <div className="text-xs text-muted-foreground">
                      Joined {new Date(user.joinDate).toLocaleDateString()}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 border-border">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 border-border">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Results Summary */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </main>
      </div>
    </div>
  )
}
