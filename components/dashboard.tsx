"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "./auth-provider"
import { WorkflowBuilder } from "./workflow-builder"
import { WorkflowTemplates } from "./workflow-templates"
import { AnalyticsCharts } from "./analytics-charts"
import { RealTimeMetrics } from "./real-time-metrics"
import { IntegrationHub } from "./integration-hub"
import { TeamCollaboration } from "./team-collaboration"
import { TaskOptimization } from "./task-optimization"
import { SettingsPanel } from "./settings-panel"
import {
  BarChart3,
  Settings,
  Users,
  Workflow,
  Zap,
  TrendingUp,
  LogOut,
  Bell,
  Search,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  BookTemplate as Template,
  Play,
  Pause,
  Edit,
  Copy,
  Calendar,
  Download,
  UserPlus,
  Menu,
} from "lucide-react"
import logo from '../public/logo.svg'

export function Dashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("workflows")
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const MobileNavigation = () => (
    <div className="lg:hidden">
      <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto">
        <TabsTrigger value="workflows" className="flex flex-col items-center gap-1 text-xs p-2">
          <Workflow className="h-4 w-4" />
          <span className="hidden sm:inline">Workflows</span>
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex flex-col items-center gap-1 text-xs p-2">
          <BarChart3 className="h-4 w-4" />
          <span className="hidden sm:inline">Analytics</span>
        </TabsTrigger>
        <TabsTrigger value="integrations" className="flex flex-col items-center gap-1 text-xs p-2">
          <Zap className="h-4 w-4" />
          <span className="hidden sm:inline">Integrations</span>
        </TabsTrigger>
        <TabsTrigger value="team" className="flex flex-col items-center gap-1 text-xs p-2">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Team</span>
        </TabsTrigger>
        <TabsTrigger value="optimization" className="flex flex-col items-center gap-1 text-xs p-2">
          <TrendingUp className="h-4 w-4" />
          <span className="hidden sm:inline">Optimization</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex flex-col items-center gap-1 text-xs p-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
        </TabsTrigger>
      </TabsList>
    </div>
  )

  const SidebarNavigation = () => (
    <nav className="space-y-2">
      <Button
        variant={activeTab === "workflows" ? "secondary" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("workflows")
          setSidebarOpen(false)
        }}
      >
        <Workflow className="h-4 w-4 mr-3" />
        Workflows
      </Button>
      <Button
        variant={activeTab === "analytics" ? "secondary" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("analytics")
          setSidebarOpen(false)
        }}
      >
        <BarChart3 className="h-4 w-4 mr-3" />
        Analytics
      </Button>
      <Button
        variant={activeTab === "integrations" ? "secondary" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("integrations")
          setSidebarOpen(false)
        }}
      >
        <Zap className="h-4 w-4 mr-3" />
        Integrations
      </Button>
      <Button
        variant={activeTab === "team" ? "secondary" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("team")
          setSidebarOpen(false)
        }}
      >
        <Users className="h-4 w-4 mr-3" />
        Team
      </Button>
      <Button
        variant={activeTab === "optimization" ? "secondary" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("optimization")
          setSidebarOpen(false)
        }}
      >
        <TrendingUp className="h-4 w-4 mr-3" />
        Optimization
      </Button>
      <Button
        variant={activeTab === "settings" ? "secondary" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setActiveTab("settings")
          setSidebarOpen(false)
        }}
      >
        <Settings className="h-4 w-4 mr-3" />
        Settings
      </Button>
    </nav>
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-3 md:space-x-6">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    
                    <div>
                      <img src={logo.src} alt="" />
                    </div>
                  </div>
                  <SidebarNavigation />
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center space-x-3">
              
              <div className="hidden sm:block">
               <img src={logo.src} alt="" className="h-[3rem] w-[11rem]" />
              </div>
            </div>
            <Badge variant="secondary" className="hidden md:inline-flex">
              Enterprise Dashboard
            </Badge>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-accent rounded-full"></span>
            </Button>
            <div className="flex items-center space-x-2 md:space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.displayName?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user?.displayName || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={logout} className="hidden sm:flex bg-transparent">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <Button variant="outline" size="sm" onClick={logout} className="sm:hidden bg-transparent">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:flex w-64 flex-col border-r bg-card/50">
          <div className="p-6">
            <SidebarNavigation />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <MobileNavigation />

            <TabsContent value="workflows" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-balance">Workflow Automation Engine</h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Build, monitor, and execute automated processes
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowTemplates(true)}>
                    <Template className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Templates</span>
                  </Button>
                  <Button size="sm" onClick={() => setShowWorkflowBuilder(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">New Workflow</span>
                  </Button>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl md:text-2xl font-bold text-primary">24</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1 text-accent" />
                      +3 from last week
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl md:text-2xl font-bold text-accent">98.5%</div>
                    <Progress value={98.5} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl md:text-2xl font-bold text-secondary">1,247h</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1 text-accent" />
                      +156 hours this month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Automation Score</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl md:text-2xl font-bold text-green-600">87%</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1 text-accent" />
                      +5% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Workflows */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Workflows</CardTitle>
                  <CardDescription>Latest automated processes and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <div>
                          <p className="font-medium">Email Marketing Campaign</p>
                          <p className="text-sm text-muted-foreground">Automated email sequence for new subscribers</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Active</Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <div>
                          <p className="font-medium">Data Backup Process</p>
                          <p className="text-sm text-muted-foreground">Daily automated backup to cloud storage</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Running</Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div>
                          <p className="font-medium">Social Media Posts</p>
                          <p className="text-sm text-muted-foreground">Automated posting schedule for social platforms</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Paused</Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <Card className="p-6 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Play className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Start New Workflow</h3>
                      <p className="text-sm text-muted-foreground">Create automation from scratch</p>
                    </div>
                    <Button size="sm" onClick={() => setShowWorkflowBuilder(true)}>
                      Get Started
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Template className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Use Templates</h3>
                      <p className="text-sm text-muted-foreground">Start with pre-built workflows</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowTemplates(true)}>
                      Browse Templates
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Download className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Import Workflow</h3>
                      <p className="text-sm text-muted-foreground">Upload existing automation files</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Import
                    </Button>
                  </div>
                </Card>
              </div>

              <RealTimeMetrics />
              <AnalyticsCharts />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-balance">Analytics & Insights</h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Comprehensive data analysis and performance metrics
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Date Range</span>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                </div>
              </div>

              <RealTimeMetrics />
              <AnalyticsCharts />
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-balance">Integration Hub</h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Connect with Slack, Gmail, Trello, Zapier, and custom APIs
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Add Custom API</span>
                  </Button>
                </div>
              </div>

              <IntegrationHub />
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-balance">Team Collaboration Tools</h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Assign tasks, monitor triggers, notifications
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Invite Member</span>
                  </Button>
                </div>
              </div>

              <TeamCollaboration />
            </TabsContent>

            <TabsContent value="optimization" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-balance">Task & Process Optimization</h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    AI analyzes workflows and suggests improvements
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Generate Report</span>
                  </Button>
                </div>
              </div>

              <TaskOptimization />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <SettingsPanel />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <Dialog open={showWorkflowBuilder} onOpenChange={setShowWorkflowBuilder}>
        <DialogContent className="w-[95vw] max-w-7xl h-[90vh] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Workflow</DialogTitle>
          </DialogHeader>
          <WorkflowBuilder onClose={() => setShowWorkflowBuilder(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
        <DialogContent className="w-[95vw] max-w-6xl h-[90vh] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Workflow Templates</DialogTitle>
          </DialogHeader>
          <WorkflowTemplates
            onSelectTemplate={(template) => {
              setShowTemplates(false)
              setShowWorkflowBuilder(true)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
