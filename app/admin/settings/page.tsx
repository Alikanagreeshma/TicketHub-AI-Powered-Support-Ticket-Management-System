'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { Badge } from '@/components/ui/badge'
import { Bell, Lock, Users, Database, Globe, LogOut } from 'lucide-react'

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    siteName: 'TicketHub',
    siteUrl: 'https://tickethub.example.com',
    adminEmail: 'admin@tickethub.example.com',
    supportEmail: 'support@tickethub.example.com',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={true} />
      
      <div className="flex-1 overflow-auto">
        <Navbar userName="Admin User" userRole="Admin" />
        
        <main className="p-6 space-y-6 max-w-4xl">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage system configuration and preferences</p>
          </div>

          {/* General Settings */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                General Settings
              </CardTitle>
              <CardDescription>Configure your system information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Site Name</label>
                <Input
                  type="text"
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleInputChange}
                  className="bg-card border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Site URL</label>
                <Input
                  type="url"
                  name="siteUrl"
                  value={formData.siteUrl}
                  onChange={handleInputChange}
                  className="bg-card border-border text-foreground"
                />
              </div>
              <div className="flex gap-3">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Save Changes
                </Button>
                <Button variant="outline" className="border-border">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Email Configuration
              </CardTitle>
              <CardDescription>Set up email addresses for notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Admin Email</label>
                <Input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleInputChange}
                  className="bg-card border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Support Email</label>
                <Input
                  type="email"
                  name="supportEmail"
                  value={formData.supportEmail}
                  onChange={handleInputChange}
                  className="bg-card border-border text-foreground"
                />
              </div>
              <div className="flex gap-3">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Update Emails
                </Button>
                <Button variant="outline" className="border-border">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Control notification behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">New Ticket Notifications</p>
                    <p className="text-sm text-muted-foreground">Alert on high priority tickets</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Escalation Alerts</p>
                    <p className="text-sm text-muted-foreground">Notify when tickets are escalated</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Daily Summary</p>
                    <p className="text-sm text-muted-foreground">Send daily ticket summary</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                Save Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security
              </CardTitle>
              <CardDescription>Manage security settings and access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-card rounded-lg">
                <p className="font-medium text-foreground mb-2">Change Password</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Update your admin password regularly to keep your account secure
                </p>
                <Button variant="outline" className="border-border">
                  Change Password
                </Button>
              </div>
              <div className="p-3 bg-card rounded-lg">
                <p className="font-medium text-foreground mb-2">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Enable 2FA for enhanced security
                </p>
                <Button variant="outline" className="border-border">
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">TicketHub Version</span>
                <span className="font-medium text-foreground">2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Database Status</span>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Backup</span>
                <span className="font-medium text-foreground">2024-05-15 02:30 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Users</span>
                <span className="font-medium text-foreground">4</span>
              </div>
            </CardContent>
          </Card>

          {/* Logout */}
          <Card className="border border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogOut className="w-5 h-5" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Sign out from your admin account
              </p>
              <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
