"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Zap,
  Users,
  Database,
  Mail,
} from "lucide-react"

interface MetricData {
  value: number
  change: number
  trend: "up" | "down" | "stable"
}

export function RealTimeMetrics() {
  const [metrics, setMetrics] = useState({
    activeWorkflows: { value: 24, change: 12.5, trend: "up" as const },
    executionsPerHour: { value: 156, change: -3.2, trend: "down" as const },
    successRate: { value: 98.5, change: 2.1, trend: "up" as const },
    avgExecutionTime: { value: 2.3, change: -8.7, trend: "up" as const },
    totalExecutions: { value: 12847, change: 15.3, trend: "up" as const },
    errorRate: { value: 1.5, change: -0.3, trend: "up" as const },
  })

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "Email validation step taking longer than usual",
      workflow: "Email Campaign",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "critical",
      message: "Database connection timeout detected",
      workflow: "Lead Processing",
      time: "5 min ago",
    },
    { id: 3, type: "info", message: "New workflow template available", workflow: "System", time: "10 min ago" },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        executionsPerHour: {
          ...prev.executionsPerHour,
          value: prev.executionsPerHour.value + Math.floor(Math.random() * 10) - 5,
        },
        totalExecutions: {
          ...prev.totalExecutions,
          value: prev.totalExecutions.value + Math.floor(Math.random() * 3),
        },
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : ""
    return `${sign}${change.toFixed(1)}%`
  }

  const getChangeColor = (change: number, trend: string) => {
    if (trend === "up" && change > 0) return "text-green-600"
    if (trend === "down" && change < 0) return "text-red-600"
    return "text-muted-foreground"
  }

  return (
    <div className="space-y-6">
      {/* Real-time KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{metrics.activeWorkflows.value}</div>
            <p
              className={`text-xs flex items-center ${getChangeColor(metrics.activeWorkflows.change, metrics.activeWorkflows.trend)}`}
            >
              {metrics.activeWorkflows.trend === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {formatChange(metrics.activeWorkflows.change)} from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Executions/Hour</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{metrics.executionsPerHour.value}</div>
            <p
              className={`text-xs flex items-center ${getChangeColor(metrics.executionsPerHour.change, metrics.executionsPerHour.trend)}`}
            >
              {metrics.executionsPerHour.trend === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {formatChange(metrics.executionsPerHour.change)} from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.successRate.value}%</div>
            <Progress value={metrics.successRate.value} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Execution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{metrics.avgExecutionTime.value}s</div>
            <p className={`text-xs flex items-center ${getChangeColor(metrics.avgExecutionTime.change, "up")}`}>
              <TrendingUp className="h-3 w-3 mr-1" />
              {formatChange(Math.abs(metrics.avgExecutionTime.change))} faster
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalExecutions.value.toLocaleString()}</div>
            <p
              className={`text-xs flex items-center ${getChangeColor(metrics.totalExecutions.change, metrics.totalExecutions.trend)}`}
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              {formatChange(metrics.totalExecutions.change)} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{metrics.errorRate.value}%</div>
            <p className={`text-xs flex items-center text-green-600`}>
              <TrendingUp className="h-3 w-3 mr-1" />
              {formatChange(Math.abs(metrics.errorRate.change))} improvement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Real-time Alerts</CardTitle>
              <CardDescription>System alerts and notifications requiring attention</CardDescription>
            </div>
            <Badge variant="secondary">{alerts.length} active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === "critical"
                      ? "bg-red-500"
                      : alert.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant={
                        alert.type === "critical" ? "destructive" : alert.type === "warning" ? "secondary" : "default"
                      }
                    >
                      {alert.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{alert.workflow}</span>
                  </div>
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Resolve
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Response Time</span>
                <span className="text-sm font-medium text-green-600">142ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database Connection</span>
                <Badge variant="default" className="text-xs">
                  Healthy
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Queue Processing</span>
                <Badge variant="default" className="text-xs">
                  Normal
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Memory Usage</span>
                <span className="text-sm font-medium">67%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Integration Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">Email Service</span>
                </div>
                <Badge variant="default" className="text-xs">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="text-sm">Database</span>
                </div>
                <Badge variant="default" className="text-xs">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">CRM</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Syncing
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm">Webhooks</span>
                </div>
                <Badge variant="default" className="text-xs">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Resource Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CPU Usage</span>
                  <span>45%</span>
                </div>
                <Progress value={45} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Memory</span>
                  <span>67%</span>
                </div>
                <Progress value={67} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Storage</span>
                  <span>23%</span>
                </div>
                <Progress value={23} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Network</span>
                  <span>12%</span>
                </div>
                <Progress value={12} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
