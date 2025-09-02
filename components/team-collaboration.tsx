"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserPlus, MessageSquare, Bell, CheckCircle, Clock, MoreHorizontal, Mail, Plus } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: "online" | "offline" | "away"
  avatar: string
  tasksAssigned: number
  tasksCompleted: number
  workflowsOwned: number
  lastActive: string
}

interface Task {
  id: string
  title: string
  description: string
  assignee: string
  assigneeName: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "todo" | "in-progress" | "review" | "completed"
  dueDate: string
  workflow: string
  createdBy: string
  createdAt: string
}

interface Notification {
  id: string
  type: "task" | "workflow" | "mention" | "system"
  title: string
  message: string
  from: string
  time: string
  read: boolean
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@gwt.com",
    role: "Workflow Manager",
    department: "Operations",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksAssigned: 12,
    tasksCompleted: 8,
    workflowsOwned: 5,
    lastActive: "Now",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@gwt.com",
    role: "Automation Specialist",
    department: "Engineering",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksAssigned: 8,
    tasksCompleted: 6,
    workflowsOwned: 3,
    lastActive: "5 min ago",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@gwt.com",
    role: "Data Analyst",
    department: "Analytics",
    status: "away",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksAssigned: 6,
    tasksCompleted: 4,
    workflowsOwned: 2,
    lastActive: "1 hour ago",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@gwt.com",
    role: "Integration Developer",
    department: "Engineering",
    status: "offline",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksAssigned: 10,
    tasksCompleted: 7,
    workflowsOwned: 4,
    lastActive: "2 hours ago",
  },
]

const tasks: Task[] = [
  {
    id: "1",
    title: "Review Email Campaign Workflow",
    description: "Review and optimize the email campaign automation workflow for better performance",
    assignee: "1",
    assigneeName: "Sarah Johnson",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-01-15",
    workflow: "Email Campaign Automation",
    createdBy: "Admin User",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    title: "Fix Slack Integration Issue",
    description: "Resolve the connection timeout issue with Slack integration",
    assignee: "2",
    assigneeName: "Michael Chen",
    priority: "urgent",
    status: "todo",
    dueDate: "2024-01-12",
    workflow: "Team Notifications",
    createdBy: "Admin User",
    createdAt: "2024-01-11",
  },
  {
    id: "3",
    title: "Analyze Workflow Performance Data",
    description: "Generate performance report for Q4 workflow executions",
    assignee: "3",
    assigneeName: "Emily Rodriguez",
    priority: "medium",
    status: "review",
    dueDate: "2024-01-20",
    workflow: "Analytics Dashboard",
    createdBy: "Admin User",
    createdAt: "2024-01-08",
  },
  {
    id: "4",
    title: "Update API Documentation",
    description: "Update integration API documentation with new endpoints",
    assignee: "4",
    assigneeName: "David Kim",
    priority: "low",
    status: "completed",
    dueDate: "2024-01-10",
    workflow: "Documentation",
    createdBy: "Admin User",
    createdAt: "2024-01-05",
  },
]

const notifications: Notification[] = [
  {
    id: "1",
    type: "task",
    title: "New Task Assigned",
    message: 'You have been assigned to "Review Email Campaign Workflow"',
    from: "Admin User",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    type: "workflow",
    title: "Workflow Completed",
    message: "Email Campaign Automation workflow completed successfully",
    from: "System",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "mention",
    title: "You were mentioned",
    message: "Sarah mentioned you in a comment on Lead Qualification workflow",
    from: "Sarah Johnson",
    time: "2 hours ago",
    read: true,
  },
]

export function TeamCollaboration() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [showAddTask, setShowAddTask] = useState(false)
  const [showInviteMember, setShowInviteMember] = useState(false)
  const [activeView, setActiveView] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "todo":
        return <Badge variant="outline">To Do</Badge>
      case "in-progress":
        return <Badge variant="default">In Progress</Badge>
      case "review":
        return <Badge variant="secondary">Review</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Team Overview */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Team Members</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-primary">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              {teamMembers.filter((m) => m.status === "online").length} online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Active Tasks</CardTitle>
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-accent">
              {tasks.filter((t) => t.status !== "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {tasks.filter((t) => t.status === "completed").length} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-secondary">
              {notifications.filter((n) => !n.read).length}
            </div>
            <p className="text-xs text-muted-foreground">unread messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Completion Rate</CardTitle>
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-green-600">87%</div>
            <Progress value={87} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 sm:w-auto">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs sm:text-sm">
              Tasks
            </TabsTrigger>
            <TabsTrigger value="members" className="text-xs sm:text-sm">
              Members
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs sm:text-sm">
              Notifications
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowAddTask(true)} className="flex-1 sm:flex-none">
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Add Task</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInviteMember(true)}
              className="flex-1 sm:flex-none"
            >
              <UserPlus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Invite</span>
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          {/* Team Activity Feed */}
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
                <CardDescription className="text-sm">Latest team actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    {
                      user: "Sarah Johnson",
                      action: "completed task",
                      target: "Email Template Review",
                      time: "10 min ago",
                      type: "success",
                    },
                    {
                      user: "Michael Chen",
                      action: "started working on",
                      target: "Slack Integration Fix",
                      time: "25 min ago",
                      type: "info",
                    },
                    {
                      user: "Emily Rodriguez",
                      action: "submitted for review",
                      target: "Q4 Analytics Report",
                      time: "1 hour ago",
                      type: "warning",
                    },
                    {
                      user: "David Kim",
                      action: "commented on",
                      target: "API Documentation",
                      time: "2 hours ago",
                      type: "info",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          activity.type === "success"
                            ? "bg-green-500"
                            : activity.type === "warning"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                          <span className="font-medium break-words">{activity.target}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Team Performance</CardTitle>
                <CardDescription className="text-sm">Individual team member statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm truncate">{member.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{member.role}</div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-medium">
                          {member.tasksCompleted}/{member.tasksAssigned}
                        </div>
                        <div className="text-xs text-muted-foreground">tasks</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex-1">
              <Input placeholder="Search tasks..." className="w-full" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {tasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h4 className="font-medium text-sm sm:text-base truncate">{task.title}</h4>
                        <div className="flex flex-wrap gap-2">
                          {getStatusBadge(task.status)}
                          <Badge className={`${getPriorityColor(task.priority)} text-xs`}>{task.priority}</Badge>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-muted-foreground">
                        <span className="truncate">Assigned to: {task.assigneeName}</span>
                        <span>Due: {task.dueDate}</span>
                        <span className="truncate">Workflow: {task.workflow}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 flex-shrink-0">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {task.assigneeName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4 sm:space-y-6">
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm sm:text-base truncate">{member.name}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{member.role}</p>
                      <p className="text-xs text-muted-foreground truncate">{member.department}</p>
                      <div className="flex items-center gap-3 sm:gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{member.tasksAssigned} tasks</span>
                        <span>{member.workflowsOwned} workflows</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-3 sm:space-y-4">
          <div className="space-y-3 sm:space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className={`${!notification.read ? "border-accent" : ""}`}>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg flex-shrink-0 ${
                        notification.type === "task"
                          ? "bg-blue-100"
                          : notification.type === "workflow"
                            ? "bg-green-100"
                            : notification.type === "mention"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                      }`}
                    >
                      {notification.type === "task" && <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />}
                      {notification.type === "workflow" && <Clock className="h-3 w-3 sm:h-4 sm:w-4" />}
                      {notification.type === "mention" && <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />}
                      {notification.type === "system" && <Bell className="h-3 w-3 sm:h-4 sm:w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{notification.title}</h4>
                        {!notification.read && <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs text-muted-foreground">
                        <span className="truncate">From: {notification.from}</span>
                        <span className="flex-shrink-0">{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Task Dialog */}
      <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Create New Task</DialogTitle>
            <DialogDescription className="text-sm">Assign a new task to a team member</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task-title" className="text-sm">
                Task Title
              </Label>
              <Input id="task-title" placeholder="Enter task title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-description" className="text-sm">
                Description
              </Label>
              <Textarea id="task-description" placeholder="Describe the task" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Assign to</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="due-date" className="text-sm">
                  Due Date
                </Label>
                <Input id="due-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Related Workflow</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select workflow" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email-campaign">Email Campaign</SelectItem>
                    <SelectItem value="lead-qualification">Lead Qualification</SelectItem>
                    <SelectItem value="invoice-generation">Invoice Generation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddTask(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={() => setShowAddTask(false)} className="w-full sm:w-auto">
                Create Task
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Invite Member Dialog */}
      <Dialog open={showInviteMember} onOpenChange={setShowInviteMember}>
        <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Invite Team Member</DialogTitle>
            <DialogDescription className="text-sm">Send an invitation to join your team</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invite-email" className="text-sm">
                Email Address
              </Label>
              <Input id="invite-email" type="email" placeholder="colleague@company.com" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="workflow-manager">Workflow Manager</SelectItem>
                  <SelectItem value="automation-specialist">Automation Specialist</SelectItem>
                  <SelectItem value="data-analyst">Data Analyst</SelectItem>
                  <SelectItem value="integration-developer">Integration Developer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-message" className="text-sm">
                Personal Message (Optional)
              </Label>
              <Textarea id="invite-message" placeholder="Add a personal message to the invitation" />
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <Button variant="outline" onClick={() => setShowInviteMember(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={() => setShowInviteMember(false)} className="w-full sm:w-auto">
                Send Invitation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Member Details Dialog */}
      {selectedMember && (
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg">Team Member Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="relative flex-shrink-0">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedMember.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {selectedMember.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${getStatusColor(selectedMember.status)}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate">{selectedMember.name}</h3>
                  <p className="text-muted-foreground truncate">{selectedMember.role}</p>
                  <p className="text-sm text-muted-foreground truncate">{selectedMember.department}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                    <Badge variant="outline">{selectedMember.status}</Badge>
                    <span className="text-sm text-muted-foreground">Last active: {selectedMember.lastActive}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <Card>
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-primary">{selectedMember.tasksAssigned}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Tasks Assigned</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-accent">{selectedMember.tasksCompleted}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Tasks Completed</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-secondary">{selectedMember.workflowsOwned}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Workflows Owned</div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-sm sm:text-base">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm truncate">{selectedMember.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedMember(null)} className="w-full sm:w-auto">
                  Close
                </Button>
                <Button className="w-full sm:w-auto">Send Message</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
