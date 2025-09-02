"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

const workflowPerformanceData = [
  { name: "Mon", executions: 245, success: 238, failed: 7 },
  { name: "Tue", executions: 312, success: 298, failed: 14 },
  { name: "Wed", executions: 189, success: 185, failed: 4 },
  { name: "Thu", executions: 278, success: 271, failed: 7 },
  { name: "Fri", executions: 356, success: 349, failed: 7 },
  { name: "Sat", executions: 198, success: 194, failed: 4 },
  { name: "Sun", executions: 167, success: 163, failed: 4 },
]

const hourlyActivityData = [
  { hour: "00:00", activity: 12 },
  { hour: "02:00", activity: 8 },
  { hour: "04:00", activity: 5 },
  { hour: "06:00", activity: 15 },
  { hour: "08:00", activity: 45 },
  { hour: "10:00", activity: 78 },
  { hour: "12:00", activity: 92 },
  { hour: "14:00", activity: 85 },
  { hour: "16:00", activity: 67 },
  { hour: "18:00", activity: 43 },
  { hour: "20:00", activity: 28 },
  { hour: "22:00", activity: 18 },
]

const workflowTypeData = [
  { name: "Email Automation", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Data Processing", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Lead Management", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Customer Support", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 8, color: "hsl(var(--chart-5))" },
]

const bottleneckData = [
  { step: "Email Validation", avgTime: 2.3, threshold: 2.0, status: "warning" },
  { step: "Data Processing", avgTime: 4.1, threshold: 5.0, status: "good" },
  { step: "API Calls", avgTime: 1.8, threshold: 2.5, status: "good" },
  { step: "Database Updates", avgTime: 3.7, threshold: 3.0, status: "critical" },
  { step: "Notifications", avgTime: 0.9, threshold: 1.5, status: "good" },
]

export function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      {/* Performance Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Performance Overview</CardTitle>
          <CardDescription>Daily execution success and failure rates</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workflowPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="success" stackId="a" fill="hsl(var(--chart-1))" name="Successful" />
              <Bar dataKey="failed" stackId="a" fill="hsl(var(--destructive))" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Hourly Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Activity</CardTitle>
            <CardDescription>Workflow executions throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={hourlyActivityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="hour" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="activity"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Workflow Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Workflow Types</CardTitle>
            <CardDescription>Distribution of workflow categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={workflowTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {workflowTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {workflowTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottleneck Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Bottleneck Analysis</CardTitle>
          <CardDescription>Identify performance bottlenecks in workflow steps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bottleneckData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      item.status === "critical"
                        ? "bg-red-500"
                        : item.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  />
                  <div>
                    <div className="font-medium">{item.step}</div>
                    <div className="text-sm text-muted-foreground">
                      Avg: {item.avgTime}s | Threshold: {item.threshold}s
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={(item.avgTime / item.threshold) * 100} className="w-24" />
                  <Badge
                    variant={
                      item.status === "critical" ? "destructive" : item.status === "warning" ? "secondary" : "default"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
