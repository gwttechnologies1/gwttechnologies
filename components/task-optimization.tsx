"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  Target,
  Brain,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  BarChart3,
  Activity,
  Settings,
  Play,
  RefreshCw,
  Star,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"

export function TaskOptimization() {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null)

  const optimizationSuggestions = [
    {
      id: "1",
      title: "Reduce Email Campaign Delay",
      description:
        "AI detected a 15-minute delay in your email workflow. Optimize trigger conditions to reduce latency by 80%.",
      impact: "High",
      timesSaved: "2.5 hours/week",
      difficulty: "Easy",
      category: "Performance",
      confidence: 94,
      status: "new",
    },
    {
      id: "2",
      title: "Parallel Processing for Lead Qualification",
      description: "Run qualification checks in parallel instead of sequential to improve processing speed by 60%.",
      impact: "Medium",
      timesSaved: "4 hours/week",
      difficulty: "Medium",
      category: "Efficiency",
      confidence: 87,
      status: "new",
    },
    {
      id: "3",
      title: "Smart Retry Logic",
      description: "Implement exponential backoff for failed API calls to reduce error rates by 45%.",
      impact: "High",
      timesSaved: "1.8 hours/week",
      difficulty: "Easy",
      category: "Reliability",
      confidence: 91,
      status: "applied",
    },
    {
      id: "4",
      title: "Workflow Consolidation",
      description: "Merge 3 similar invoice workflows into one optimized process to reduce maintenance overhead.",
      impact: "Medium",
      timesSaved: "3.2 hours/week",
      difficulty: "Hard",
      category: "Maintenance",
      confidence: 78,
      status: "new",
    },
  ]

  const performanceMetrics = [
    { name: "Avg. Execution Time", value: "2.3s", change: -15, trend: "down" },
    { name: "Success Rate", value: "98.5%", change: 2.1, trend: "up" },
    { name: "Resource Usage", value: "67%", change: -8, trend: "down" },
    { name: "Error Rate", value: "1.2%", change: -0.8, trend: "down" },
  ]

  const bottleneckAnalysis = [
    {
      workflow: "Email Campaign Automation",
      bottleneck: "API Rate Limiting",
      impact: "High",
      suggestion: "Implement request batching",
      estimatedImprovement: "40%",
    },
    {
      workflow: "Lead Qualification Process",
      bottleneck: "Database Query Optimization",
      impact: "Medium",
      suggestion: "Add database indexes",
      estimatedImprovement: "25%",
    },
    {
      workflow: "Invoice Generation",
      bottleneck: "PDF Generation",
      impact: "Low",
      suggestion: "Use async processing",
      estimatedImprovement: "15%",
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Performance Overview */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate pr-2">{metric.name}</CardTitle>
              {metric.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 text-accent flex-shrink-0" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-accent flex-shrink-0" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-primary">{metric.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {metric.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 mr-1 text-accent flex-shrink-0" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1 text-accent flex-shrink-0" />
                )}
                <span className="truncate">{Math.abs(metric.change)}% from last week</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="suggestions" className="space-y-4 sm:space-y-6">
        {/* Tabs List */}
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="suggestions" className="text-xs sm:text-sm px-2 sm:px-4">
            AI Suggestions
          </TabsTrigger>
          <TabsTrigger value="bottlenecks" className="text-xs sm:text-sm px-2 sm:px-4">
            Bottlenecks
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-xs sm:text-sm px-2 sm:px-4">
            Performance
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs sm:text-sm px-2 sm:px-4">
            History
          </TabsTrigger>
        </TabsList>

        {/* AI Suggestions Tab Content */}
        <TabsContent value="suggestions" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Brain className="h-4 sm:h-5 w-4 sm:w-5 text-primary flex-shrink-0" />
                    <span className="text-balance">AI-Powered Optimization Suggestions</span>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Machine learning analysis of your workflows with actionable improvements
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Analysis
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizationSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className={`p-3 sm:p-4 border rounded-lg transition-all cursor-pointer ${
                      selectedSuggestion === suggestion.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedSuggestion(suggestion.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                          <Lightbulb className="h-4 w-4 text-primary flex-shrink-0" />
                          <h4 className="font-semibold text-sm sm:text-base truncate">{suggestion.title}</h4>
                          <Badge
                            variant={suggestion.status === "applied" ? "secondary" : "default"}
                            className="text-xs"
                          >
                            {suggestion.status === "applied" ? "Applied" : "New"}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-3 text-pretty">
                          {suggestion.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <Target className="h-3 w-3 flex-shrink-0" />
                            <span className="text-muted-foreground">Impact:</span>
                            <Badge
                              variant={
                                suggestion.impact === "High"
                                  ? "destructive"
                                  : suggestion.impact === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {suggestion.impact}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 flex-shrink-0" />
                            <span className="text-muted-foreground">Saves:</span>
                            <span className="font-medium text-accent">{suggestion.timesSaved}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Settings className="h-3 w-3 flex-shrink-0" />
                            <span className="text-muted-foreground">Difficulty:</span>
                            <span className="font-medium">{suggestion.difficulty}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm text-muted-foreground">Confidence:</span>
                          <span className="font-semibold text-primary text-sm">{suggestion.confidence}%</span>
                        </div>
                        <Progress value={suggestion.confidence} className="w-16 sm:w-20" />
                      </div>
                    </div>

                    {selectedSuggestion === suggestion.id && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <Button size="sm" disabled={suggestion.status === "applied"} className="w-full sm:w-auto">
                              {suggestion.status === "applied" ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Applied
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4 mr-2" />
                                  Apply Suggestion
                                </>
                              )}
                            </Button>
                            <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                              View Details
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 justify-center sm:justify-end">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bottleneck Analysis Tab Content */}
        <TabsContent value="bottlenecks" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <AlertTriangle className="h-4 sm:h-5 w-4 sm:w-5 text-destructive flex-shrink-0" />
                <span className="text-balance">Bottleneck Analysis</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Identified performance bottlenecks and optimization opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bottleneckAnalysis.map((item, index) => (
                  <div key={index} className="p-3 sm:p-4 border rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base truncate">{item.workflow}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground text-pretty">{item.bottleneck}</p>
                      </div>
                      <Badge
                        variant={
                          item.impact === "High" ? "destructive" : item.impact === "Medium" ? "default" : "secondary"
                        }
                        className="text-xs self-start sm:self-center"
                      >
                        {item.impact} Impact
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium">Suggested Fix:</p>
                        <p className="text-xs sm:text-sm text-muted-foreground text-pretty">{item.suggestion}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-sm font-medium text-accent">+{item.estimatedImprovement}</p>
                        <p className="text-xs text-muted-foreground">improvement</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab Content */}
        <TabsContent value="performance" className="space-y-4 sm:space-y-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <BarChart3 className="h-4 sm:h-5 w-4 sm:w-5 text-primary flex-shrink-0" />
                  <span className="text-balance">Optimization Impact</span>
                </CardTitle>
                <CardDescription className="text-sm">Performance improvements over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm truncate">Execution Speed</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Progress value={85} className="w-16 sm:w-24" />
                      <span className="text-xs sm:text-sm font-medium">+85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm truncate">Resource Efficiency</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Progress value={72} className="w-16 sm:w-24" />
                      <span className="text-xs sm:text-sm font-medium">+72%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm truncate">Error Reduction</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Progress value={91} className="w-16 sm:w-24" />
                      <span className="text-xs sm:text-sm font-medium">-91%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm truncate">Cost Savings</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Progress value={68} className="w-16 sm:w-24" />
                      <span className="text-xs sm:text-sm font-medium">$2,340</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Activity className="h-4 sm:h-5 w-4 sm:w-5 text-primary flex-shrink-0" />
                  <span className="text-balance">Real-Time Monitoring</span>
                </CardTitle>
                <CardDescription className="text-sm">Current system performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm truncate">CPU Usage</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Progress value={45} className="w-16 sm:w-24" />
                      <span className="text-xs sm:text-sm font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm truncate">Memory Usage</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Progress value={62} className="w-16 sm:w-24" />
                      <span className="text-xs sm:text-sm font-medium">62%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm truncate">Network I/O</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Progress value={38} className="w-16 sm:w-24" />
                      <span className="text-xs sm:text-sm font-medium">38%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm truncate">Queue Length</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Progress value={15} className="w-16 sm:w-24" />
                      <span className="text-xs sm:text-sm font-medium">15</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* History Tab Content */}
        <TabsContent value="history" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Star className="h-4 sm:h-5 w-4 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-balance">Optimization History</span>
              </CardTitle>
              <CardDescription className="text-sm">Previously applied optimizations and their results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    date: "2 days ago",
                    optimization: "Smart Retry Logic",
                    result: "Reduced error rate by 45%",
                    impact: "High",
                  },
                  {
                    date: "1 week ago",
                    optimization: "Database Query Optimization",
                    result: "Improved response time by 30%",
                    impact: "Medium",
                  },
                  {
                    date: "2 weeks ago",
                    optimization: "Parallel Processing Implementation",
                    result: "Increased throughput by 60%",
                    impact: "High",
                  },
                  {
                    date: "1 month ago",
                    optimization: "Cache Layer Addition",
                    result: "Reduced API calls by 40%",
                    impact: "Medium",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg gap-3"
                  >
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base truncate">{item.optimization}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground text-pretty">{item.result}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <Badge variant={item.impact === "High" ? "destructive" : "default"} className="text-xs mb-1">
                        {item.impact} Impact
                      </Badge>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
