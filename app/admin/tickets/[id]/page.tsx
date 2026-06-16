'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { ArrowLeft, Send, MessageCircle, MoreVertical } from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  author: string
  role: string
  content: string
  timestamp: string
  isAdmin: boolean
}

export default function AdminTicketPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      author: 'John Doe',
      role: 'User',
      content: 'I&apos;m unable to login on mobile devices. The login page loads but the button doesn&apos;t respond.',
      timestamp: '2024-05-15 09:15 AM',
      isAdmin: false,
    },
    {
      id: '2',
      author: 'Sarah Johnson',
      role: 'You (Support Agent)',
      content: 'Thank you for reporting this issue. I&apos;ve started investigating. Can you provide details about which browser you&apos;re using?',
      timestamp: '2024-05-15 10:30 AM',
      isAdmin: true,
    },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [ticketStatus, setTicketStatus] = useState('open')
  const [assignedTo, setAssignedTo] = useState('sarah-johnson')
  const [internalNotes, setInternalNotes] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        author: 'Sarah Johnson',
        role: 'You (Support Agent)',
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        isAdmin: true,
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-[var(--priority-high)] text-white'
      case 'medium':
        return 'bg-[var(--priority-medium)] text-white'
      case 'low':
        return 'bg-[var(--priority-low)] text-white'
      default:
        return 'bg-muted text-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-[var(--status-open)] text-white'
      case 'in-progress':
        return 'bg-[var(--status-in-progress)] text-white'
      case 'closed':
        return 'bg-[var(--status-closed)] text-white'
      default:
        return 'bg-muted text-foreground'
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={true} />
      
      <div className="flex-1 overflow-auto">
        <Navbar userName="Admin User" userRole="Administrator" />
        
        <main className="p-6 space-y-6">
          {/* Back button and header */}
          <div className="flex items-center gap-4">
            <Link href="/admin/tickets">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Ticket #1001</h1>
              <p className="text-muted-foreground mt-1">Login page not working on mobile</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Main content */}
            <div className="col-span-2 space-y-6">
              {/* Ticket Details */}
              <Card className="border border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Ticket Information</CardTitle>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Current Status</p>
                      <Select value={ticketStatus} onValueChange={setTicketStatus}>
                        <SelectTrigger className="bg-card border-border text-foreground w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Priority</p>
                      <Badge className={`w-full justify-center py-1 ${getPriorityColor('high')}`}>
                        High
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Created Date</p>
                      <p className="text-sm font-medium text-foreground">2024-05-15</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-foreground leading-relaxed">
                      User reports that the login button on the mobile version is not responding to clicks. Issue occurs specifically on mobile Safari and Chrome. Desktop version works fine. User has tried clearing cache and using incognito mode without success.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* User Information */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Name</p>
                      <p className="text-sm font-medium text-foreground">John Doe</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Email</p>
                      <p className="text-sm font-medium text-foreground">john.doe@example.com</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Account Created</p>
                      <p className="text-sm font-medium text-foreground">2023-10-15</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total Tickets</p>
                      <p className="text-sm font-medium text-foreground">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Messages */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>Conversation</CardTitle>
                  <CardDescription>Messages with the customer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-4 ${message.isAdmin ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-sm p-4 rounded-lg ${
                            message.isAdmin
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted border border-border'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className={`font-medium text-sm ${
                              message.isAdmin ? 'text-primary-foreground' : 'text-foreground'
                            }`}>
                              {message.author}
                            </p>
                            <span className={`text-xs ${
                              message.isAdmin ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {message.timestamp}
                            </span>
                          </div>
                          <p className={`text-sm ${
                            message.isAdmin ? 'text-primary-foreground' : 'text-foreground'
                          }`}>
                            {message.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="pt-4 border-t border-border space-y-2">
                    <Textarea
                      placeholder="Type your response here..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="bg-card border-border text-foreground placeholder-muted-foreground min-h-24"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Assignment */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-base">Assignment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Assign To</label>
                  <Select value={assignedTo} onValueChange={setAssignedTo}>
                    <SelectTrigger className="bg-card border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="mike-chen">Mike Chen</SelectItem>
                      <SelectItem value="emma-wilson">Emma Wilson</SelectItem>
                      <SelectItem value="james-brown">James Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Internal Notes */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-base">Internal Notes</CardTitle>
                  <CardDescription className="text-xs">Not visible to customer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Textarea
                    placeholder="Add internal notes..."
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    className="bg-card border-border text-foreground placeholder-muted-foreground min-h-24"
                  />
                  <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                    Save Notes
                  </Button>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-base">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
                    Close Ticket
                  </Button>
                  <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted" size="sm">
                    Escalate
                  </Button>
                  <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted" size="sm">
                    Send to Customer
                  </Button>
                </CardContent>
              </Card>

              {/* Related Tickets */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-base">Related Tickets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <button className="w-full text-left text-sm text-primary hover:text-primary/80 font-medium">
                    #998 - Mobile login issue
                  </button>
                  <button className="w-full text-left text-sm text-primary hover:text-primary/80 font-medium">
                    #892 - iOS Safari problem
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
