const BASE_URL = 'http://127.0.0.1:5000'

export async function registerUser(name: string, email: string, password: string) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
      role: 'user',
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed')
  }

  return data
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Login failed')
  }

  return data
}

export async function createTicket(
  userId: number,
  subject: string,
  description: string,
  category: string,
  priority: string
) {
  const response = await fetch(`${BASE_URL}/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
      subject,
      description,
      category,
      priority,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create ticket')
  }

  return data
}

export async function getTickets(filters?: {
  userId?: number
  status?: string
  priority?: string
}) {
  let url = `${BASE_URL}/tickets`
  const params = new URLSearchParams()

  if (filters?.userId) params.append('user_id', filters.userId.toString())
  if (filters?.status) params.append('status', filters.status)
  if (filters?.priority) params.append('priority', filters.priority)

  if (params.toString()) {
    url += `?${params.toString()}`
  }

  const response = await fetch(url)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch tickets')
  }

  return data.tickets || []
}

export async function getTicket(ticketId: number) {
  const response = await fetch(`${BASE_URL}/tickets/${ticketId}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch ticket')
  }

  return data.ticket
}

export async function updateTicket(
  ticketId: number,
  updates: {
    status?: string
    priority?: string
    assigned_admin?: number | null
    category?: string
    description?: string
  }
) {
  const response = await fetch(`${BASE_URL}/tickets/${ticketId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update ticket')
  }

  return data.ticket
}
