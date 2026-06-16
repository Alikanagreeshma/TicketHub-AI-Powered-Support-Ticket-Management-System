'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { createTicket } from '@/lib/api'
import { calculatePriority } from '@/lib/priorityRules'
import { getAssignedAdminId } from '@/lib/adminAssignment'

export default function CreateTicketPage() {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: 'General',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.subject.trim()) {
      setError('Subject is required')
      return
    }

    if (!formData.description.trim()) {
      setError('Description is required')
      return
    }

    const userId = localStorage.getItem('userId')
    if (!userId) {
      setError('You must be logged in to create a ticket')
      router.push('/')
      return
    }

    setIsLoading(true)

    try {
      // Calculate priority based on content
      const priority = calculatePriority(formData.subject, formData.description)

      const response = await createTicket(
        parseInt(userId),
        formData.subject,
        formData.description,
        formData.category,
        priority
      )

      if (response.ticket_id) {
        alert('Ticket created successfully!')
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create ticket')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Ticket</h1>
            <p className="text-muted-foreground mt-1">Describe your issue to get help from our support team</p>
          </div>
        </div>

        {/* Create Ticket Form */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Ticket Details</CardTitle>
            <CardDescription>Fill in the information about your issue</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <Input
                  type="text"
                  name="subject"
                  placeholder="Brief description of your issue..."
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-card border-border text-foreground placeholder-muted-foreground"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Category</label>
                <Select value={formData.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="bg-card border-border text-foreground">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Billing">Billing</SelectItem>
                    <SelectItem value="Payment">Payment</SelectItem>
                    <SelectItem value="Server">Server</SelectItem>
                    <SelectItem value="Login">Login</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Choose the category that best fits your issue</p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <textarea
                  name="description"
                  placeholder="Please provide detailed information about your issue..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-3 py-2 bg-card border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Priority will be automatically assigned based on your issue description
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-priority-high/10 border border-priority-high text-priority-high rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Ticket...' : 'Create Ticket'}
                </Button>
                <Link href="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full border-border text-foreground hover:bg-card">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Box */}
        <Card className="border border-border mt-6 bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-2">ℹ️ How Priority Works</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>High:</strong> Keywords like "payment failed", "server down", "cannot login", "urgent"</li>
              <li>• <strong>Medium:</strong> Keywords like "slow", "bug", "issue", "error"</li>
              <li>• <strong>Low:</strong> All other issues</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
