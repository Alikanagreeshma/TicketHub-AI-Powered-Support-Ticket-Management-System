'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { TicketsTable } from '@/components/tickets-table'
import { getTickets } from '@/lib/api'
import { useRouter } from 'next/navigation'

interface Ticket {
  ticket_id: string | number
  subject: string
  priority: 'High' | 'Medium' | 'Low'
  status: string
  assigned_admin?: string | number | null
  created_at: string
  category: string
  user_id: number
}

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchTickets = async () => {
      const userId = localStorage.getItem('userId')

      if (!userId) {
        router.push('/')
        return
      }

      try {
        const data = await getTickets({ userId: parseInt(userId) })
        setTickets(data)
      } catch (error) {
        console.error('Failed to fetch tickets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [router])

  const normalizeStatus = (status: string): 'open' | 'in-progress' | 'resolved' | 'closed' => {
    const normalized = status.toLowerCase().replace(' ', '-')
    if (normalized === 'in-progress' || normalized === 'in progress') return 'in-progress'
    if (normalized === 'open') return 'open'
    if (normalized === 'resolved' || normalized === 'closed') return 'closed'
    return 'closed'
  }

  const normalizePriority = (priority: string): 'high' | 'medium' | 'low' => {
    const lower = priority.toLowerCase()
    if (lower === 'high') return 'high'
    if (lower === 'medium') return 'medium'
    return 'low'
  }

  const displayTickets = tickets.map(t => ({
    id: t.ticket_id.toString(),
    subject: t.subject,
    priority: normalizePriority(t.priority),
    status: normalizeStatus(t.status),
    assignedTo: t.assigned_admin ? `Admin ${t.assigned_admin}` : 'Unassigned',
    createdDate: new Date(t.created_at).toLocaleDateString(),
  }))

  const filteredTickets = displayTickets.filter(ticket => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.includes(searchQuery)
    const matchesStatus = statusFilter === 'all' || !statusFilter || ticket.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || !priorityFilter || ticket.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={false} />

      <div className="flex-1 overflow-auto">
        <Navbar />

        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Tickets</h1>
              <p className="text-muted-foreground mt-1">View and manage all your support tickets</p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" className="gap-2 border-border text-foreground hover:bg-card">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
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

              <Link href="/tickets/create">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  <Plus className="w-4 h-4" />
                  New Ticket
                </Button>
              </Link>
            </div>
          </div>

          {/* Tickets Table */}
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading tickets...</div>
          ) : filteredTickets.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-4">No tickets found.</p>
              {!searchQuery && !statusFilter && !priorityFilter && (
                <Link href="/tickets/create">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    <Plus className="w-4 h-4" />
                    Create Your First Ticket
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredTickets.length} of {displayTickets.length} tickets
              </p>
              <TicketsTable tickets={filteredTickets} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
