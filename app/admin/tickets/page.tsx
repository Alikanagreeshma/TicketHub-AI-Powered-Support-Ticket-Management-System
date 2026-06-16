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
import { Search, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { getTickets, updateTicket } from '@/lib/api'
import { useRouter } from 'next/navigation'

interface TicketData {
  ticket_id: number
  subject: string
  priority: 'High' | 'Medium' | 'Low'
  status: string
  assigned_admin: number | null
  created_at: string
  user_id: number
  category: string
  description: string
  updated_at: string
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<TicketData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [assignmentFilter, setAssignmentFilter] = useState('all')
  const [expandedTicket, setExpandedTicket] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchTickets = async () => {
      const userRole = localStorage.getItem('userRole')

      if (userRole !== 'admin') {
        router.push('/dashboard')
        return
      }

      try {
        const data = await getTickets()
        setTickets(data)
      } catch (error) {
        console.error('Failed to fetch tickets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [router])

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticket_id.toString().includes(searchQuery)
    const matchesStatus =
  statusFilter === 'all' || ticket.status === statusFilter

const matchesPriority =
  priorityFilter === 'all' || ticket.priority === priorityFilter

const matchesAssignment =
  assignmentFilter === 'all' ||
  (assignmentFilter === 'unassigned' && !ticket.assigned_admin) ||
  (assignmentFilter === 'assigned' && ticket.assigned_admin)
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignment
  })

  const handleUpdateStatus = async (ticketId: number, newStatus: string) => {
    try {
      await updateTicket(ticketId, { status: newStatus })
      const data = await getTickets()
      setTickets(data)
    } catch (error) {
      console.error('Failed to update ticket:', error)
    }
  }

  const handleAssign = async (ticketId: number, adminId: number) => {
    try {
      await updateTicket(ticketId, { assigned_admin: adminId })
      const data = await getTickets()
      setTickets(data)
    } catch (error) {
      console.error('Failed to assign ticket:', error)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
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
    const lower = status.toLowerCase()
    if (lower === 'open')
      return 'bg-[var(--status-open)] text-white'
    if (lower === 'in progress')
      return 'bg-[var(--status-in-progress)] text-white'
    if (lower === 'resolved' || lower === 'closed')
      return 'bg-[var(--status-closed)] text-white'
    return 'bg-muted text-foreground'
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={true} />

      <div className="flex-1 overflow-auto">
        <Navbar />

        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Manage Tickets</h1>
              <p className="text-muted-foreground mt-1">View and manage all support tickets</p>
            </div>
            <Link href="/admin">
              <Button variant="outline" className="gap-2 border-border text-foreground hover:bg-card">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Filters */}
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
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-40 bg-card border-border text-foreground">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={assignmentFilter} onValueChange={setAssignmentFilter}>
                <SelectTrigger className="w-40 bg-card border-border text-foreground">
                  <SelectValue placeholder="Filter by assignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tickets</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tickets List */}
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading tickets...</div>
          ) : filteredTickets.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No tickets found</div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredTickets.length} of {tickets.length} tickets
              </p>

              {filteredTickets.map(ticket => (
                <Card key={ticket.ticket_id} className="border border-border p-4">
                  <div
                    className="cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors"
                    onClick={() => setExpandedTicket(expandedTicket === ticket.ticket_id ? null : ticket.ticket_id)}
                  >
                    {/* Ticket Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-foreground">#{ticket.ticket_id}</span>
                          <span className="text-foreground font-medium truncate">{ticket.subject}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          User ID: {ticket.user_id} | Category: {ticket.category}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className={`capitalize ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </Badge>
                        <Badge className={`capitalize ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="text-xs text-muted-foreground">
                      Created: {new Date(ticket.created_at).toLocaleDateString()} | Updated: {new Date(ticket.updated_at).toLocaleDateString()}
                    </div>

                    {/* Expanded Content */}
                    {expandedTicket === ticket.ticket_id && (
                      <div className="mt-4 pt-4 border-t border-border space-y-4">
                        {/* Description */}
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Description</h4>
                          <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                            {ticket.description}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-4">
                          {/* Status Update */}
                          <div>
                            <label className="text-sm font-medium text-foreground block mb-2">
                              Update Status
                            </label>
                            <Select
                              value={ticket.status}
                              onValueChange={(newStatus) => handleUpdateStatus(ticket.ticket_id, newStatus)}
                            >
                              <SelectTrigger className="bg-card border-border text-foreground text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Open">Open</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Resolved">Resolved</SelectItem>
                                <SelectItem value="Closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Assign */}
                          <div>
                            <label className="text-sm font-medium text-foreground block mb-2">
                              Assign to
                            </label>
                            <Select
                              value={ticket.assigned_admin?.toString() || '0'}
                              onValueChange={(adminId) => {
                                if (adminId === '0') return
                                handleAssign(ticket.ticket_id, parseInt(adminId))
                              }}>
                              <SelectTrigger className="bg-card border-border text-foreground text-sm">
                                <SelectValue placeholder="Select admin" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">Unassigned</SelectItem>
                                <SelectItem value="1">Admin 1 (Payment/Billing)</SelectItem>
                                <SelectItem value="2">Admin 2 (Technical)</SelectItem>
                                <SelectItem value="3">Admin 3 (General)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Assignment Info */}
                        <div className="text-sm text-muted-foreground bg-muted p-3 rounded">
                          {ticket.assigned_admin ? (
                            <>Assigned to: Admin {ticket.assigned_admin}</>
                          ) : (
                            <>Not assigned</>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
