'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Lock, Mail, Ticket } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message)
        setIsLoading(false)
        return
      }

      if (data.role !== 'user') {
        setError('Please use Admin Login')
        setIsLoading(false)
        return
      }

      // Save to localStorage
      localStorage.setItem('userId', data.user_id.toString())
      localStorage.setItem('userName', data.name)
      localStorage.setItem('userEmail', data.email)
      localStorage.setItem('userRole', data.role)

      alert('Login successful!')
      window.location.href = '/dashboard'
    } catch (error) {
      setError('Unable to connect to server')
      setIsLoading(false)
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message)
        setIsLoading(false)
        return
      }

      if (data.role !== 'admin') {
        setError('This account is not an admin')
        setIsLoading(false)
        return
      }

      // Save to localStorage
      localStorage.setItem('userId', data.user_id.toString())
      localStorage.setItem('userName', data.name)
      localStorage.setItem('userEmail', data.email)
      localStorage.setItem('userRole', data.role)

      alert('Admin login successful!')
      window.location.href = '/admin'
    } catch (error) {
      setError('Unable to connect to server')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Ticket className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">TicketHub</h1>
          </div>
          <p className="text-muted-foreground">Professional Support Ticket Management</p>
        </div>

        {/* Login Card */}
        <Card className="border border-border">
          <CardHeader id="card-header">
            <CardTitle id="card-title" className="text-foreground">Sign In</CardTitle>
            <CardDescription id="card-description">Choose your account type to continue</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="user" className="w-full" onValueChange={(value) => {
              const titleEl = document.getElementById('card-title')
              const descEl = document.getElementById('card-description')
              if (value === 'admin') {
                if (titleEl) titleEl.textContent = 'Admin Portal'
                if (descEl) descEl.textContent = 'Manage support tickets and customer issues'
              } else {
                if (titleEl) titleEl.textContent = 'Sign In'
                if (descEl) descEl.textContent = 'Choose your account type to continue'
              }
            }}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="user">User Login</TabsTrigger>
                <TabsTrigger value="admin">Admin Login</TabsTrigger>
              </TabsList>

              {/* User Login Tab */}
              <TabsContent value="user">
                <form onSubmit={handleUserLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="pl-10 bg-card border-border text-foreground placeholder-muted-foreground"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className="pl-10 bg-card border-border text-foreground placeholder-muted-foreground"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <Link href="#" className="text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account? <Link href="/register" className="text-primary hover:underline font-medium">Register</Link>
                  </div>
                </form>
              </TabsContent>

              {/* Admin Login Tab */}
              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Admin Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="admin@example.com"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="pl-10 bg-card border-border text-foreground placeholder-muted-foreground"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="pl-10 bg-card border-border text-foreground placeholder-muted-foreground"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Admin Sign In'}
                  </Button>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <Link href="#" className="text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account? <Link href="/register" className="text-primary hover:underline font-medium">Register</Link>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
