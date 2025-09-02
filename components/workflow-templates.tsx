"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Users, FileText, Calendar, Database, Zap, Clock, Star } from "lucide-react"

const workflowTemplates = [
  {
    id: 1,
    name: "Email Campaign Automation",
    description: "Automatically send personalized emails based on user actions and segments",
    category: "Marketing",
    complexity: "Beginner",
    estimatedTime: "15 min",
    rating: 4.8,
    steps: 5,
    icon: <Mail className="h-5 w-5" />,
    tags: ["Email", "Marketing", "Automation"],
    popular: true,
  },
  {
    id: 2,
    name: "Lead Qualification Process",
    description: "Score and qualify leads automatically based on their behavior and profile data",
    category: "Sales",
    complexity: "Intermediate",
    estimatedTime: "25 min",
    rating: 4.6,
    steps: 8,
    icon: <Users className="h-5 w-5" />,
    tags: ["Sales", "CRM", "Lead Scoring"],
    popular: true,
  },
  {
    id: 3,
    name: "Invoice Generation & Follow-up",
    description: "Generate invoices automatically and send follow-up reminders for overdue payments",
    category: "Finance",
    complexity: "Intermediate",
    estimatedTime: "30 min",
    rating: 4.7,
    steps: 6,
    icon: <FileText className="h-5 w-5" />,
    tags: ["Finance", "Invoicing", "Payments"],
  },
  {
    id: 4,
    name: "Customer Onboarding Journey",
    description: "Welcome new customers with a series of automated emails and tasks",
    category: "Customer Success",
    complexity: "Advanced",
    estimatedTime: "45 min",
    rating: 4.9,
    steps: 12,
    icon: <Users className="h-5 w-5" />,
    tags: ["Onboarding", "Customer Success", "Email"],
  },
  {
    id: 5,
    name: "Meeting Scheduler",
    description: "Automatically schedule meetings based on availability and send calendar invites",
    category: "Productivity",
    complexity: "Beginner",
    estimatedTime: "20 min",
    rating: 4.5,
    steps: 4,
    icon: <Calendar className="h-5 w-5" />,
    tags: ["Calendar", "Scheduling", "Meetings"],
  },
  {
    id: 6,
    name: "Data Backup & Sync",
    description: "Automatically backup important data and sync across multiple platforms",
    category: "Operations",
    complexity: "Advanced",
    estimatedTime: "40 min",
    rating: 4.4,
    steps: 10,
    icon: <Database className="h-5 w-5" />,
    tags: ["Backup", "Sync", "Data Management"],
  },
]

export function WorkflowTemplates({ onSelectTemplate }: { onSelectTemplate: (template: any) => void }) {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Workflow Templates</h3>
        <p className="text-muted-foreground">Get started quickly with pre-built workflow templates</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workflowTemplates.map((template) => (
          <Card
            key={template.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectTemplate(template)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">{template.icon}</div>
                  <div className="flex-1">
                    <CardTitle className="text-base flex items-center gap-2">
                      {template.name}
                      {template.popular && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                      <Badge className={`text-xs ${getComplexityColor(template.complexity)}`}>
                        {template.complexity}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="mb-4">{template.description}</CardDescription>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {template.estimatedTime}
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {template.steps} steps
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {template.rating}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {template.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button className="w-full" size="sm">
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
