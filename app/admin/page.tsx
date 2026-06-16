'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { StatCard } from '@/components/stat-card'
import { AlertCircle, Clock, CheckCircle, Ticket } from 'lucide-react'
import Link from 'next/link'
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
}

export default function AdminPage() {
  const [tickets, setTickets] = useState<TicketData[]>([])
  const [loading, setLoading] = useState(true)
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

  const stats = [
    {
      title: 'Total Tickets',
      value: tickets.length,
      description: 'All tickets in system',
      icon: <Ticket className="w-5 h-5" />,
    },
    {
      title: 'Open Tickets',
      value: tickets.filter(t => t.status === 'Open').length,
      description: 'Awaiting assignment',
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      title: 'In Progress',
      value: tickets.filter(t => t.status === 'In Progress').length,
      description: 'Currently being handled',
      icon: <Clock className="w-5 h-5" />,
    },
    {
      title: 'Closed Tickets',
      value: tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length,
      description: 'Resolved issues',
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      title: 'High Priority',
      value: tickets.filter(t => t.priority === 'High').length,
      description: 'Need immediate attention',
      icon: <AlertCircle className="w-5 h-5" />,
    },
  ]

  const highPriorityTickets = tickets
    .filter(t => t.priority === 'High')
    .slice(0, 5)

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

  const handleAssignTicket = async (ticketId: number, adminId: number) => {
    try {
      await updateTicket(ticketId, { assigned_admin: adminId })
      // Refresh tickets
      const data = await getTickets()
      setTickets(data)
    } catch (error) {
      console.error('Failed to assign ticket:', error)
    }
  }

  const handleUpdateStatus = async (ticketId: number, newStatus: string) => {
    try {
      await updateTicket(ticketId, { status: newStatus })
      // Refresh tickets
      const data = await getTickets()
      setTickets(data)
    } catch (error) {
      console.error('Failed to update ticket status:', error)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={true} />

      <div className="flex-1 overflow-auto">
        <Navbar />

        <main className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Monitor and manage all support tickets</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                description={stat.description}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              {/* High Priority Tickets */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>High Priority Tickets</CardTitle>
                  <CardDescription>Tickets requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-muted-foreground text-center py-4">Loading tickets...</p>
                  ) : highPriorityTickets.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No high priority tickets</p>
                  ) : (
                    <div className="space-y-3">
                      {highPriorityTickets.map((ticket) => (
                        <div key={ticket.ticket_id} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">#{ticket.ticket_id}</span>
                              <span className="text-sm text-foreground truncate">{ticket.subject}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(ticket.created_at).toLocaleDateString()}
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
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* All Tickets Summary */}
              <Card className="border border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Ticket Statistics</CardTitle>
                      <CardDescription>Distribution by status and priority</CardDescription>
                    </div>
                    <Link href="/admin/tickets">
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        View All Tickets
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Open', count: tickets.filter(t => t.status === 'Open').length },
                      { label: 'In Progress', count: tickets.filter(t => t.status === 'In Progress').length },
                      { label: 'Resolved', count: tickets.filter(t => t.status === 'Resolved').length },
                      { label: 'Closed', count: tickets.filter(t => t.status === 'Closed').length },
                    ].map(stat => (
                      <div key={stat.label} className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold text-foreground">{stat.count}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-base">System Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Avg. Resolution Time</p>
                    <p className="text-lg font-bold text-foreground">Calculating...</p>
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground mb-1">Total Users</p>
                    <p className="text-lg font-bold text-foreground">All</p>
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground mb-1">Unassigned Tickets</p>
                    <p className="text-lg font-bold text-foreground">
                      {tickets.filter(t => !t.assigned_admin).length}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/admin/tickets">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 justify-start">
                      Manage Tickets
                    </Button>
                  </Link>
                  <Link href="/admin/users">
                    <Button variant="outline" className="w-full border-border text-foreground hover:bg-card justify-start">
                      View Users
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
