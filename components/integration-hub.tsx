"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  MessageSquare,
  Trello,
  Zap,
  Database,
  Globe,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  Activity,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  category: string
  status: "connected" | "disconnected" | "error" | "syncing"
  usage: number
  lastSync: string
  apiCalls: number
  popular: boolean
}

const availableIntegrations: Integration[] = [
  {
    id: "gmail",
    name: "Gmail",
    description: "Send and receive emails, manage contacts, and automate email workflows",
    icon: <Mail className="h-5 w-5" />,
    category: "Communication",
    status: "connected",
    usage: 85,
    lastSync: "2 minutes ago",
    apiCalls: 1247,
    popular: true,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Send messages, create channels, and manage team communications",
    icon: <MessageSquare className="h-5 w-5" />,
    category: "Communication",
    status: "connected",
    usage: 67,
    lastSync: "5 minutes ago",
    apiCalls: 892,
    popular: true,
  },
  {
    id: "trello",
    name: "Trello",
    description: "Create cards, manage boards, and automate project workflows",
    icon: <Trello className="h-5 w-5" />,
    category: "Project Management",
    status: "syncing",
    usage: 45,
    lastSync: "1 hour ago",
    apiCalls: 456,
    popular: true,
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect with 5000+ apps and create powerful automation chains",
    icon: <Zap className="h-5 w-5" />,
    category: "Automation",
    status: "connected",
    usage: 92,
    lastSync: "30 seconds ago",
    apiCalls: 2156,
    popular: true,
  },
  {
    id: "database",
    name: "Custom Database",
    description: "Connect to your custom database for data operations",
    icon: <Database className="h-5 w-5" />,
    category: "Data",
    status: "connected",
    usage: 78,
    lastSync: "1 minute ago",
    apiCalls: 3421,
    popular: false,
  },
  {
    id: "webhook",
    name: "Custom Webhooks",
    description: "Receive and send HTTP requests to any API endpoint",
    icon: <Globe className="h-5 w-5" />,
    category: "API",
    status: "disconnected",
    usage: 0,
    lastSync: "Never",
    apiCalls: 0,
    popular: false,
  },
]

export function IntegrationHub() {
  const [integrations, setIntegrations] = useState(availableIntegrations)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [showSetupDialog, setShowSetupDialog] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = ["all", "Communication", "Project Management", "Automation", "Data", "API"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500"
      case "syncing":
        return "bg-blue-500"
      case "error":
        return "bg-red-500"
      case "disconnected":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Connected
          </Badge>
        )
      case "syncing":
        return <Badge variant="secondary">Syncing</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "disconnected":
        return <Badge variant="outline">Disconnected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredIntegrations =
    activeCategory === "all"
      ? integrations
      : integrations.filter((integration) => integration.category === activeCategory)

  const connectedCount = integrations.filter((i) => i.status === "connected").length
  const totalApiCalls = integrations.reduce((sum, i) => sum + i.apiCalls, 0)

  return (
    <div className="space-y-6">
      {/* Integration Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{connectedCount}</div>
            <p className="text-xs text-muted-foreground">of {integrations.length} integrations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{totalApiCalls.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">142ms</div>
            <p className="text-xs text-muted-foreground">response time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98%</div>
            <Progress value={98} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
          >
            {category === "all" ? "All Categories" : category}
          </Button>
        ))}
      </div>

      {/* Integration Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">{integration.icon}</div>
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {integration.name}
                      {integration.popular && (
                        <Badge variant="secondary" className="text-xs">
                          Popular
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(integration.status)}`} />
                      {getStatusBadge(integration.status)}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="mb-4">{integration.description}</CardDescription>

              {integration.status === "connected" && (
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Usage this month</span>
                    <span>{integration.usage}%</span>
                  </div>
                  <Progress value={integration.usage} />

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>API Calls: {integration.apiCalls.toLocaleString()}</span>
                    <span>Last sync: {integration.lastSync}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {integration.status === "connected" ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => setSelectedIntegration(integration)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setSelectedIntegration(integration)
                      setShowSetupDialog(true)
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Usage Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Integration Usage</CardTitle>
            <CardDescription>API calls and usage statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integrations
                .filter((i) => i.status === "connected")
                .map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-primary/10 rounded">{integration.icon}</div>
                      <div>
                        <div className="font-medium">{integration.name}</div>
                        <div className="text-sm text-muted-foreground">{integration.apiCalls} calls</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{integration.usage}%</div>
                      <div className="text-sm text-muted-foreground">usage</div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest integration events and syncs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { integration: "Gmail", action: "Sent 15 emails", time: "2 min ago", status: "success" },
                { integration: "Slack", action: "Posted to #general", time: "5 min ago", status: "success" },
                { integration: "Zapier", action: "Triggered workflow", time: "8 min ago", status: "success" },
                { integration: "Trello", action: "Sync failed", time: "1 hour ago", status: "error" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${activity.status === "success" ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <div className="flex-1">
                    <div className="text-sm">{activity.action}</div>
                    <div className="text-xs text-muted-foreground">{activity.integration}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Setup Dialog */}
      <Dialog open={showSetupDialog} onOpenChange={setShowSetupDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Connect {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>
              Set up your {selectedIntegration?.name} integration to start automating workflows
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="setup" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="setup">Setup</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="test">Test</TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" placeholder="Enter your API key" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endpoint">Endpoint URL</Label>
                  <Input id="endpoint" placeholder="https://api.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Optional description for this integration" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Read Access</div>
                    <div className="text-sm text-muted-foreground">Allow reading data from this service</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Write Access</div>
                    <div className="text-sm text-muted-foreground">Allow creating and updating data</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Delete Access</div>
                    <div className="text-sm text-muted-foreground">Allow deleting data (use with caution)</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="test" className="space-y-4">
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Connection Successful!</h3>
                <p className="text-muted-foreground mb-4">
                  Your {selectedIntegration?.name} integration is ready to use
                </p>
                <Button onClick={() => setShowSetupDialog(false)}>Complete Setup</Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Configuration Dialog */}
      {selectedIntegration && !showSetupDialog && (
        <Dialog open={!!selectedIntegration} onOpenChange={() => setSelectedIntegration(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Configure {selectedIntegration.name}</DialogTitle>
              <DialogDescription>
                Manage settings and preferences for your {selectedIntegration.name} integration
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {selectedIntegration.icon}
                  <div>
                    <div className="font-medium">{selectedIntegration.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedIntegration.apiCalls.toLocaleString()} API calls this month
                    </div>
                  </div>
                </div>
                {getStatusBadge(selectedIntegration.status)}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Rate Limiting</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Requests per minute</span>
                    <Input className="w-20" defaultValue="100" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Retry Settings</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Max retries</span>
                    <Input className="w-20" defaultValue="3" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Auto-sync</div>
                    <div className="text-sm text-muted-foreground">Automatically sync data every hour</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedIntegration(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setSelectedIntegration(null)}>Save Changes</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
