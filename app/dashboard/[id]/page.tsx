'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { ArrowLeft, Send, Calendar, User, Tag } from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  author: string
  role: string
  content: string
  timestamp: string
  isAdmin: boolean
}

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      author: 'Sarah Johnson',
      role: 'Support Agent',
      content: 'Thank you for creating this ticket. I&apos;ve reviewed your issue and will begin investigating immediately.',
      timestamp: '2024-05-15 10:30 AM',
      isAdmin: true,
    },
    {
      id: '2',
      author: 'You',
      role: 'User',
      content: 'I&apos;m unable to login on mobile devices. The login page loads but the button doesn&apos;t respond.',
      timestamp: '2024-05-15 09:15 AM',
      isAdmin: false,
    },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        author: 'You',
        role: 'User',
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        isAdmin: false,
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={false} />
      
      <div className="flex-1 overflow-auto">
        <Navbar userName="John Doe" userRole="User" />
        
        <main className="p-6 space-y-6">
          {/* Back button and header */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
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
              {/* Ticket Details Card */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>Ticket Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <Badge className="bg-[var(--status-open)] text-white">Open</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Priority</p>
                      <Badge className="bg-[var(--priority-high)] text-white">High</Badge>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-foreground">
                      {`User reports that the login button on the mobile version of the website is not responding to clicks. Issue appears to be specific to mobile devices and does not occur on desktop. Initial investigation needed.`}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Messages */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>Conversation</CardTitle>
                  <CardDescription>Messages between you and support team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-4 ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-sm p-4 rounded-lg ${
                            message.isAdmin
                              ? 'bg-muted border border-border'
                              : 'bg-primary text-primary-foreground'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className={`font-medium text-sm ${
                              message.isAdmin ? 'text-foreground' : 'text-primary-foreground'
                            }`}>
                              {message.author}
                            </p>
                            <span className={`text-xs ${
                              message.isAdmin ? 'text-muted-foreground' : 'text-primary-foreground/70'
                            }`}>
                              {message.timestamp}
                            </span>
                          </div>
                          <p className={`text-sm ${
                            message.isAdmin ? 'text-foreground' : 'text-primary-foreground'
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
                      placeholder="Type your message here..."
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
              {/* Resolution Notes */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-base">Resolution Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Add resolution notes here..."
                    className="bg-card border-border text-foreground placeholder-muted-foreground min-h-24"
                  />
                  <Button variant="outline" className="w-full mt-2 border-border text-foreground hover:bg-muted">
                    Save Notes
                  </Button>
                </CardContent>
              </Card>

              {/* Info Panel */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-base">Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Created
                    </p>
                    <p className="text-sm font-medium text-foreground">2024-05-15</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Assigned To
                    </p>
                    <p className="text-sm font-medium text-foreground">Sarah Johnson</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Category
                    </p>
                    <p className="text-sm font-medium text-foreground">Technical Issue</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
