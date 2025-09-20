import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Presentation, BookOpen, Shield, Database, BarChart } from "lucide-react";
import { PresentationsTab } from "./tabs/PresentationsTab";
import { MarksTab } from "./tabs/MarksTab";
import { AttendanceTab } from "./tabs/AttendanceTab";
import { ResourcesTab } from "./tabs/ResourcesTab";
import { AnalyticsTab } from "./tabs/AnalyticsTab";

const ManagementTools = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary">
          <Shield className="w-4 h-4" />
          <span className="text-sm font-medium">Sir Management Tools</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Faculty Resource Management
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our platform provides dedicated tools to help teachers and faculty members manage academic tasks with ease and efficiency. 
          Upload presentations, manage marks, and organize teaching resources all in one place.
        </p>
      </div>

      {/* Management Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upload & Share Presentations */}
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Presentation className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Upload & Share</CardTitle>
            <CardDescription>
              Easily upload lecture presentations and share them with students in one click
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Marks Management */}
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Marks Management</CardTitle>
            <CardDescription>
              Record, update, and analyze students' paper marks in a structured format
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Notes Repository */}
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Notes Repository</CardTitle>
            <CardDescription>
              Store and distribute class notes, reference materials, and study resources
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Interactive Management Panel */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Resource Management Panel
          </CardTitle>
          <CardDescription>
            Upload presentations, manage resources, and organize teaching materials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="presentations" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="presentations" className="flex items-center gap-2">
                <Presentation className="w-4 h-4" />
                Presentations
              </TabsTrigger>
              <TabsTrigger value="marks" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Marks
              </TabsTrigger>
              <TabsTrigger value="attendance" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Attendance
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Resources
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart className="w-4 h-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="presentations" className="space-y-4">
              <PresentationsTab />
            </TabsContent>
            
            <TabsContent value="marks" className="space-y-4">
              <MarksTab />
            </TabsContent>
            
            <TabsContent value="attendance" className="space-y-4">
              <AttendanceTab />
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4">
              <ResourcesTab />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <AnalyticsTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagementTools;