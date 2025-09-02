"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, Database, Slack, Calendar, FileText, Zap, ArrowRight, Play, Save, X, Plus } from "lucide-react"

interface WorkflowStep {
  id: string
  type: "trigger" | "action" | "condition"
  name: string
  description: string
  icon: React.ReactNode
  config: Record<string, any>
}

const availableSteps: Omit<WorkflowStep, "id" | "config">[] = [
  {
    type: "trigger",
    name: "Email Received",
    description: "Triggers when a new email is received",
    icon: <Mail className="h-4 w-4" />,
  },
  {
    type: "trigger",
    name: "Form Submission",
    description: "Triggers when a form is submitted",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    type: "trigger",
    name: "Schedule",
    description: "Triggers at specified times",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    type: "action",
    name: "Send Email",
    description: "Send an automated email",
    icon: <Mail className="h-4 w-4" />,
  },
  {
    type: "action",
    name: "Update Database",
    description: "Update records in database",
    icon: <Database className="h-4 w-4" />,
  },
  {
    type: "action",
    name: "Send Slack Message",
    description: "Send message to Slack channel",
    icon: <Slack className="h-4 w-4" />,
  },
]

export function WorkflowBuilder({ onClose }: { onClose: () => void }) {
  const [workflowName, setWorkflowName] = useState("")
  const [workflowDescription, setWorkflowDescription] = useState("")
  const [steps, setSteps] = useState<WorkflowStep[]>([])
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null)

  const addStep = (stepTemplate: Omit<WorkflowStep, "id" | "config">) => {
    const newStep: WorkflowStep = {
      ...stepTemplate,
      id: `step-${Date.now()}`,
      config: {},
    }
    setSteps([...steps, newStep])
  }

  const removeStep = (stepId: string) => {
    setSteps(steps.filter((step) => step.id !== stepId))
  }

  const saveWorkflow = () => {
    // Mock save functionality
    console.log("Saving workflow:", { workflowName, workflowDescription, steps })
    onClose()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Workflow Builder</h3>
          <p className="text-sm text-muted-foreground">Create automated workflows with drag-and-drop simplicity</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Workflow Configuration */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Workflow Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workflow-name">Name</Label>
                <Input
                  id="workflow-name"
                  placeholder="Enter workflow name"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workflow-description">Description</Label>
                <Textarea
                  id="workflow-description"
                  placeholder="Describe what this workflow does"
                  value={workflowDescription}
                  onChange={(e) => setWorkflowDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Available Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Available Steps</CardTitle>
              <CardDescription>Drag or click to add steps to your workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Triggers</div>
                {availableSteps
                  .filter((step) => step.type === "trigger")
                  .map((step, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start h-auto p-3"
                      onClick={() => addStep(step)}
                    >
                      <div className="flex items-center gap-3">
                        {step.icon}
                        <div className="text-left">
                          <div className="font-medium">{step.name}</div>
                          <div className="text-xs text-muted-foreground">{step.description}</div>
                        </div>
                      </div>
                    </Button>
                  ))}

                <Separator className="my-3" />

                <div className="text-sm font-medium text-muted-foreground">Actions</div>
                {availableSteps
                  .filter((step) => step.type === "action")
                  .map((step, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start h-auto p-3"
                      onClick={() => addStep(step)}
                    >
                      <div className="flex items-center gap-3">
                        {step.icon}
                        <div className="text-left">
                          <div className="font-medium">{step.name}</div>
                          <div className="text-xs text-muted-foreground">{step.description}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflow Canvas */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Workflow Canvas</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                  <Button size="sm" onClick={saveWorkflow}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {steps.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Zap className="h-12 w-12 text-muted-foreground mb-4" />
                  <h4 className="text-lg font-medium mb-2">Start Building Your Workflow</h4>
                  <p className="text-muted-foreground mb-4">
                    Add triggers and actions from the left panel to create your automation
                  </p>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Step
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-4">
                      <Card
                        className="flex-1 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedStep(step)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${step.type === "trigger" ? "bg-accent/20" : "bg-primary/20"}`}
                              >
                                {step.icon}
                              </div>
                              <div>
                                <div className="font-medium">{step.name}</div>
                                <div className="text-sm text-muted-foreground">{step.description}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={step.type === "trigger" ? "secondary" : "default"}>{step.type}</Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeStep(step.id)
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      {index < steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Step Configuration Dialog */}
      {selectedStep && (
        <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Configure {selectedStep.name}</DialogTitle>
              <DialogDescription>Set up the parameters for this workflow step</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Step Name</Label>
                <Input value={selectedStep.name} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Configuration</Label>
                <Textarea placeholder="Enter step configuration (JSON format)" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedStep(null)}>
                  Cancel
                </Button>
                <Button onClick={() => setSelectedStep(null)}>Save Configuration</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
