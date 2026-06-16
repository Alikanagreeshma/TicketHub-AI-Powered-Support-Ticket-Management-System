'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { TicketsTable } from '@/components/tickets-table'
import { Search } from 'lucide-react'
import Link from 'next/link'

const assignedTickets = [
  {
    id: '1020',
    subject: 'Database performance slow',
    priority: 'high' as const,
    status: 'in-progress' as const,
    assignedTo: 'Mike Chen',
    createdDate: '2024-05-15',
  },
  {
    id: '1019',
    subject: 'User can\'t upload files',
    priority: 'medium' as const,
    status: 'in-progress' as const,
    assignedTo: 'Sarah Johnson',
    createdDate: '2024-05-14',
  },
  {
    id: '1017',
    subject: 'Dashboard performance improvement needed',
    priority: 'medium' as const,
    status: 'in-progress' as const,
    assignedTo: 'Mike Chen',
    createdDate: '2024-05-13',
  },
  {
    id: '1015',
    subject: 'Fix typo in documentation',
    priority: 'low' as const,
    status: 'closed' as const,
    assignedTo: 'Sarah Johnson',
    createdDate: '2024-05-12',
  },
  {
    id: '1012',
    subject: 'Implement two-factor authentication',
    priority: 'high' as const,
    status: 'in-progress' as const,
    assignedTo: 'Emma Wilson',
    createdDate: '2024-05-10',
  },
]

export default function AssignedTicketsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  const filteredTickets = assignedTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.includes(searchQuery)
    const matchesStatus = statusFilter === 'all' || !statusFilter || ticket.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || !priorityFilter || ticket.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={true} />
      
      <div className="flex-1 overflow-auto">
        <Navbar userName="Admin User" userRole="Admin" />
        
        <main className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Assigned Tickets</h1>
            <p className="text-muted-foreground mt-1">Tickets assigned to your team members</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by ticket ID or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border text-foreground placeholder-muted-foreground"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-card border-border text-foreground">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-40 bg-card border-border text-foreground">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="rounded-lg border border-border">
            <TicketsTable tickets={filteredTickets} />
          </div>

          {/* Results Summary */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredTickets.length} of {assignedTickets.length} tickets
          </div>
        </main>
      </div>
    </div>
  )
}
