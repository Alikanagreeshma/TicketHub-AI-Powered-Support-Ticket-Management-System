'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import Link from 'next/link'

interface Ticket {
  id: string
  subject: string
  priority: 'high' | 'medium' | 'low'
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  assignedTo: string
  createdDate: string
}

interface TicketsTableProps {
  tickets: Ticket[]
  onViewDetails?: (ticketId: string) => void
}

export function TicketsTable({ tickets, onViewDetails }: TicketsTableProps) {
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
      case 'resolved':
        return 'bg-[var(--status-resolved)] text-white'
      case 'closed':
        return 'bg-[var(--status-closed)] text-white'
      default:
        return 'bg-muted text-foreground'
    }
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted border-b border-border">
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Ticket ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Subject</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Priority</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Assigned To</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Created Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">#{ticket.id}</td>
                <td className="px-6 py-4 text-sm text-foreground">{ticket.subject}</td>
                <td className="px-6 py-4">
                  <Badge className={`capitalize ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge className={`capitalize ${getStatusColor(ticket.status)}`}>
                    {ticket.status.replace('-', ' ')}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{ticket.assignedTo}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{ticket.createdDate}</td>
                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails?.(ticket.id)}
                    className="text-primary hover:bg-primary/10"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
