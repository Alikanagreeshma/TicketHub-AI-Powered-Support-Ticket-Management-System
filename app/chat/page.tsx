'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Send, Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { findFAQResponse } from '@/lib/faq'
import { createTicket } from '@/lib/api'
import { calculatePriority } from '@/lib/priorityRules'
import { useRouter } from 'next/navigation'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI support assistant. I can help you with common questions about password resets, billing, technical issues, and more. How can I assist you today?',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    const currentMessage = inputValue
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(async () => {
      let aiResponse = findFAQResponse(currentMessage)

      if (!aiResponse) {
        // If no FAQ match, suggest escalation
        aiResponse =
          "I couldn't find an answer to your question in my knowledge base. Would you like me to escalate this to human support? I can create a ticket for you."
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, aiMessage])

      // Check if user is asking for human support
      if (
        currentMessage.toLowerCase().includes('human') ||
        currentMessage.toLowerCase().includes('support') ||
        currentMessage.toLowerCase().includes('escalate') ||
        currentMessage.toLowerCase().includes('ticket')
      ) {
        handleEscalateToSupport(currentMessage)
      }

      setIsLoading(false)
    }, 800)
  }

  const handleEscalateToSupport = async (issue: string) => {
    const userId = localStorage.getItem('userId')

    if (!userId) {
      alert('Please log in first')
      router.push('/')
      return
    }

    try {
      const priority = calculatePriority('Escalated from AI Chat', issue)

      await createTicket(
        parseInt(userId),
        'Escalated from AI Chat Support',
        issue,
        'General',
        priority
      )

      // Add confirmation message
      const confirmMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: '✓ Your issue has been escalated to our human support team. A support representative will get back to you shortly. You can track your ticket in the dashboard.',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, confirmMessage])
    } catch (error) {
      console.error('Failed to create support ticket:', error)

      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: 'Sorry, I had trouble creating a support ticket. Please try again or visit the dashboard to create a ticket manually.',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, errorMessage])
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={false} />

      <div className="flex-1 overflow-auto flex flex-col">
        <Navbar />

        <main className="flex-1 flex flex-col p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Support Assistant</h1>
              <p className="text-muted-foreground mt-1">Get instant answers or escalate to human support</p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" className="gap-2 border-border text-foreground hover:bg-card">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Chat Container */}
          <Card className="flex-1 border border-border flex flex-col bg-card overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-4 py-2 rounded-lg rounded-bl-none">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Ask me anything or type 'escalate' for human support..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 bg-background border-border text-foreground placeholder-muted-foreground"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-border p-4">
              <h3 className="font-semibold text-foreground mb-2">Common Topics</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Password reset help</li>
                <li>• Billing & payment issues</li>
                <li>• Technical support</li>
              </ul>
            </Card>

            <Card className="border border-border p-4">
              <h3 className="font-semibold text-foreground mb-2">How I Can Help</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Answer FAQ questions</li>
                <li>• Provide quick solutions</li>
                <li>• Escalate to support team</li>
              </ul>
            </Card>

            <Card className="border border-border p-4">
              <h3 className="font-semibold text-foreground mb-2">Need More Help?</h3>
              <Link href="/tickets/create">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 mt-2">
                  <Plus className="w-4 h-4" />
                  Create Ticket
                </Button>
              </Link>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
