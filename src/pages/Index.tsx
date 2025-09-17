import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/ui/stats-card";
import MarksTable from "@/components/dashboard/MarksTable";
import DocumentLinks from "@/components/dashboard/DocumentLinks";
import ChatInterface from "@/components/chatbot/ChatInterface";
import { useGoogleSheets } from "@/hooks/useGoogleSheets";
import { GraduationCap, Users, TrendingUp, Calendar } from "lucide-react";

const Index = () => {
  const { students, loading } = useGoogleSheets();
  
  // Calculate real-time stats
  const totalStudents = students.length;
  const averageMarks = students.length > 0 
    ? students.reduce((acc, student) => {
        const subjects = Object.values(student.subjects);
        const studentAvg = subjects.reduce((sum, subject) => sum + subject.percentage, 0) / subjects.length;
        return acc + studentAvg;
      }, 0) / students.length 
    : 0;
  
  const averageAttendance = students.length > 0
    ? students.reduce((acc, student) => acc + student.attendance, 0) / students.length
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary))_0%,transparent_50%)] opacity-10 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <DashboardHeader />
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Students"
              value={loading ? "..." : totalStudents.toString()}
              description="Government Polytechnic Arvi"
              icon={Users}
              trend={{ value: "CO-3-K Branch", isPositive: true }}
            />
            <StatsCard
              title="Average Marks"
              value={loading ? "..." : averageMarks.toFixed(1)}
              description="Overall performance"
              icon={GraduationCap}
              trend={{ value: "Real-time sync", isPositive: true }}
            />
            <StatsCard
              title="Attendance Rate"
              value={loading ? "..." : `${averageAttendance.toFixed(1)}%`}
              description="Class attendance"
              icon={Calendar}
              trend={{ value: "Live updates", isPositive: true }}
            />
            <StatsCard
              title="Google Sheets"
              value="Connected"
              description="AY 2025-26 Data"
              icon={TrendingUp}
              trend={{ value: "Auto-sync", isPositive: true }}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Marks Table - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <MarksTable />
            </div>
            
            {/* Sidebar Content */}
            <div className="space-y-8">
              <DocumentLinks />
            </div>
          </div>

          {/* Chatbot Interface */}
          <div className="max-w-4xl mx-auto">
            <ChatInterface />
          </div>

          {/* Integration Status */}
          <div className="mt-8 p-6 bg-card border border-border rounded-xl shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-success/10">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Real-time Data Connection</h3>
                  <p className="text-sm text-muted-foreground">
                    Connected to Google Sheets • Auto-sync every 30 seconds
                  </p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                Academic Year 2025-26
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
