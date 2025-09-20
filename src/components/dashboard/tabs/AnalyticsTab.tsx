import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, BookOpen, Award, Download, FileText } from "lucide-react";

const attendanceData = [
  { subject: "Computer Graphics", present: 68, absent: 3 },
  { subject: "Data Structure Using C", present: 65, absent: 6 },
  { subject: "Object Oriented Programming", present: 70, absent: 1 },
  { subject: "DBMS Data Base Management System", present: 63, absent: 8 },
];

const gradeDistribution = [
  { grade: "A+", count: 12, color: "#22c55e" },
  { grade: "A", count: 18, color: "#3b82f6" },
  { grade: "B+", count: 20, color: "#f59e0b" },
  { grade: "B", count: 15, color: "#ef4444" },
  { grade: "C", count: 6, color: "#8b5cf6" },
];

export const AnalyticsTab = () => {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">71</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Attendance</p>
                <p className="text-2xl font-bold">92.5%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Subjects</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Grade</p>
                <p className="text-2xl font-bold">B+</p>
              </div>
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Subject-wise Attendance</CardTitle>
            <CardDescription>Present vs Absent students by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="hsl(var(--primary))" name="Present" />
                <Bar dataKey="absent" fill="hsl(var(--destructive))" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Overall grade distribution across all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="count"
                  label={({ grade, count }) => `${grade}: ${count}`}
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Detailed analysis of student performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Computer Graphics</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Average Score:</span>
                  <span className="font-medium">82.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Attendance:</span>
                  <span className="font-medium">95.7%</span>
                </div>
                <div className="flex justify-between">
                  <span>Top Grade:</span>
                  <span className="font-medium">A+</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Data Structure Using C</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Average Score:</span>
                  <span className="font-medium">78.3%</span>
                </div>
                <div className="flex justify-between">
                  <span>Attendance:</span>
                  <span className="font-medium">91.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Top Grade:</span>
                  <span className="font-medium">A</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Object Oriented Programming</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Average Score:</span>
                  <span className="font-medium">85.1%</span>
                </div>
                <div className="flex justify-between">
                  <span>Attendance:</span>
                  <span className="font-medium">98.6%</span>
                </div>
                <div className="flex justify-between">
                  <span>Top Grade:</span>
                  <span className="font-medium">A+</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">DBMS Data Base Management System</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Average Score:</span>
                  <span className="font-medium">76.8%</span>
                </div>
                <div className="flex justify-between">
                  <span>Attendance:</span>
                  <span className="font-medium">88.7%</span>
                </div>
                <div className="flex justify-between">
                  <span>Top Grade:</span>
                  <span className="font-medium">A</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Generate Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};