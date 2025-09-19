import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Presentation, BookOpen, Shield, Database } from "lucide-react";

// Force refresh to clear PresentationChart cache issue

const ManagementTools = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [presentationTitle, setPresentationTitle] = useState("");
  const [presentationDescription, setPresentationDescription] = useState("");
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "File Selected",
        description: `${file.name} ready for upload`,
      });
    }
  };

  const handlePresentationUpload = () => {
    if (!selectedFile || !presentationTitle) {
      toast({
        title: "Missing Information",
        description: "Please select a file and enter a title",
        variant: "destructive",
      });
      return;
    }

    // Simulate upload process
    toast({
      title: "Upload Successful",
      description: `${presentationTitle} has been uploaded and shared with students`,
    });
    
    // Reset form
    setSelectedFile(null);
    setPresentationTitle("");
    setPresentationDescription("");
  };

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
            <Upload className="w-5 h-5" />
            Resource Management Panel
          </CardTitle>
          <CardDescription>
            Upload presentations, manage resources, and organize teaching materials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="presentations" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="presentations">Presentations</TabsTrigger>
              <TabsTrigger value="marks">Marks Management</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="presentations" className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="presentation">Upload Presentation</Label>
                <Input 
                  id="presentation" 
                  type="file" 
                  accept=".ppt,.pptx,.pdf"
                  onChange={handleFileUpload}
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="title">Presentation Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter presentation title"
                  value={presentationTitle}
                  onChange={(e) => setPresentationTitle(e.target.value)}
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the presentation"
                  value={presentationDescription}
                  onChange={(e) => setPresentationDescription(e.target.value)}
                />
              </div>
              
              <Button onClick={handlePresentationUpload} className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload & Share with Students
              </Button>
            </TabsContent>
            
            <TabsContent value="marks" className="space-y-4">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Student Marks Management
                  </CardTitle>
                  <CardDescription>Record, update, and manage student marks for all subjects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="student-select">Select Student</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                          <option>Select a student...</option>
                          <option>THAKARE KARTIK DEVIDAS (24310250201)</option>
                          <option>MRUNAL PRAVIN JAGTAP (24310250202)</option>
                          <option>UKANDE JAYANT MANGLESH (24310250203)</option>
                          <option>BAWANKAR SANVED RAJENDRA (24310250204)</option>
                          <option>THAKARE KALASH RAVINDRA (24310250205)</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option>Mathematics</option>
                            <option>Physics</option>
                            <option>Chemistry</option>
                            <option>English</option>
                            <option>Computer Science</option>
                            <option>Workshop Technology</option>
                            <option>Engineering Drawing</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="exam-type">Exam Type</Label>
                          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option>Unit Test 1</option>
                            <option>Unit Test 2</option>
                            <option>Mid-Term</option>
                            <option>Final Exam</option>
                            <option>Assignment</option>
                            <option>Project</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="marks-obtained">Marks Obtained</Label>
                          <Input id="marks-obtained" type="number" placeholder="0" max="100" />
                        </div>
                        <div>
                          <Label htmlFor="total-marks">Total Marks</Label>
                          <Input id="total-marks" type="number" placeholder="100" value="100" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="remarks">Remarks (Optional)</Label>
                        <Textarea id="remarks" placeholder="Add any remarks about performance..." rows={3} />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button className="flex-1">
                      <Database className="w-4 h-4 mr-2" />
                      Save Marks
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      View History
                    </Button>
                  </div>
                  
                  {/* Bulk Marks Entry */}
                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">Bulk Marks Entry</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Subject</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option>Mathematics</option>
                          <option>Physics</option>
                          <option>Chemistry</option>
                        </select>
                      </div>
                      <div>
                        <Label>Exam Type</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option>Unit Test 1</option>
                          <option>Mid-Term</option>
                          <option>Final Exam</option>
                        </select>
                      </div>
                      <div>
                        <Label>Upload CSV File</Label>
                        <Input type="file" accept=".csv,.xlsx" />
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Bulk Marks
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="attendance" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Daily Attendance */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Daily Attendance
                    </CardTitle>
                    <CardDescription>Mark daily attendance for students</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="attendance-date">Date</Label>
                        <Input id="attendance-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                      </div>
                      <div>
                        <Label htmlFor="attendance-subject">Subject/Period</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option>Mathematics</option>
                          <option>Physics</option>
                          <option>Chemistry</option>
                          <option>English</option>
                          <option>Computer Science</option>
                          <option>Workshop Technology</option>
                          <option>Engineering Drawing</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="time-period">Time Period</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option>1st Period (9:00-10:00)</option>
                          <option>2nd Period (10:00-11:00)</option>
                          <option>3rd Period (11:15-12:15)</option>
                          <option>4th Period (12:15-13:15)</option>
                          <option>5th Period (14:00-15:00)</option>
                          <option>6th Period (15:00-16:00)</option>
                        </select>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                      <div className="flex justify-between">
                        <span>Total Students: 71</span>
                        <span>Present: 65</span>
                        <span>Absent: 6</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Shield className="w-4 h-4 mr-2" />
                      Take Attendance
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Fast attendance operations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-20 flex-col">
                        <Shield className="w-6 h-6 mb-2" />
                        <span className="text-xs">Mark All Present</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col">
                        <FileText className="w-6 h-6 mb-2" />
                        <span className="text-xs">Previous Day</span>
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Recent Absentees</Label>
                      <div className="bg-muted/50 p-3 rounded-lg max-h-32 overflow-y-auto">
                        <div className="text-sm space-y-1">
                          <div>MISHRA ANURAG (24310250212) - 3 days</div>
                          <div>KAMATKAR NANDINI (24310250213) - 2 days</div>
                          <div>VARMA LAKSH (24310250214) - 1 day</div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Database className="w-4 h-4 mr-2" />
                      View Full Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Student List for Attendance */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Student List - CO-3-K Branch</CardTitle>
                  <CardDescription>Click on student names to mark attendance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="text-sm font-medium mb-4">All Students (First 15 shown)</div>
                    <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
                      {[
                        'THAKARE KARTIK DEVIDAS (24310250201)', 
                        'MRUNAL PRAVIN JAGTAP (24310250202)', 
                        'UKANDE JAYANT MANGLESH (24310250203)',
                        'BAWANKAR SANVED RAJENDRA (24310250204)',
                        'THAKARE KALASH RAVINDRA (24310250205)',
                        'LADE PAVAN RAJENDRA (24310250206)',
                        'CHOPADE PIYUSH GHANSHYAM (24310250207)',
                        'DESHMUKH SAURABH AVINASH (24310250208)',
                        'BAKALE AYUSH PRAKASH (24310250209)',
                        'BHANDWALKAR SACHIN YUDHISHTIR (24310250210)',
                        'THAKARE SANCHITA SANJAY (24310250211)',
                        'MISHRA ANURAG VIJAYPRAKASH (24310250212)',
                        'KAMATKAR NANDINI YOGESH (24310250213)',
                        'VARMA LAKSH SANTOSH (24310250214)',
                        'PENSHANWAR JANHAVI PRASHANT (24310250215)'
                      ].map((name, i) => (
                        <div key={i} className="flex items-center justify-between py-2 px-3 bg-background rounded border">
                          <span className="text-sm font-medium">{name}</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-8 px-3 text-xs bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
                              Present
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 px-3 text-xs bg-red-50 hover:bg-red-100 text-red-700 border-red-200">
                              Absent
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-4 text-center">
                      Showing 15 of 71 students • <Button variant="link" className="h-auto p-0 text-xs">View All Students</Button>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <Button className="flex-1">
                      <Shield className="w-4 h-4 mr-2" />
                      Save Attendance (71 Students)
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Upload className="w-4 h-4 mr-2" />
                      Import from CSV
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload Resources */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Upload Resources
                    </CardTitle>
                    <CardDescription>Add notes, assignments, and study materials</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="resource-type">Resource Type</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Lecture Notes</option>
                        <option>Assignment</option>
                        <option>Question Papers</option>
                        <option>Reference Material</option>
                        <option>Project Guidelines</option>
                        <option>Lab Manual</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="resource-subject">Subject</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>English</option>
                        <option>Computer Science</option>
                        <option>Workshop Technology</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="resource-file">Upload File</Label>
                      <Input id="resource-file" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" />
                    </div>
                    <div>
                      <Label htmlFor="resource-title">Title</Label>
                      <Input id="resource-title" placeholder="Enter resource title" />
                    </div>
                    <div>
                      <Label htmlFor="resource-description">Description</Label>
                      <Textarea id="resource-description" placeholder="Brief description..." rows={3} />
                    </div>
                    <Button className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Resource
                    </Button>
                  </CardContent>
                </Card>

                {/* Resource Library */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Resource Library
                    </CardTitle>
                    <CardDescription>Manage uploaded resources</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">Mathematics - Unit 1</h4>
                            <p className="text-xs text-muted-foreground">Lecture Notes • Uploaded 2 days ago</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <FileText className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">Physics Assignment 1</h4>
                            <p className="text-xs text-muted-foreground">Assignment • Uploaded 5 days ago</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <FileText className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">Chemistry Lab Manual</h4>
                            <p className="text-xs text-muted-foreground">Lab Manual • Uploaded 1 week ago</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <FileText className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <FileText className="w-4 h-4 mr-2" />
                        View All
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Database className="w-4 h-4 mr-2" />
                        Organize
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Performance Analytics */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Database className="w-4 h-4" />
                      Class Performance
                    </CardTitle>
                    <CardDescription>Overall class statistics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Marks</span>
                      <span className="font-semibold">78.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Top Performer</span>
                      <span className="font-semibold text-green-600">92.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Attendance Rate</span>
                      <span className="font-semibold">91.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Passing Rate</span>
                      <span className="font-semibold text-blue-600">95.8%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Subject Analysis */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <BookOpen className="w-4 h-4" />
                      Subject Analysis
                    </CardTitle>
                    <CardDescription>Performance by subject</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mathematics</span>
                      <span className="font-semibold">82.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Physics</span>
                      <span className="font-semibold">79.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Chemistry</span>
                      <span className="font-semibold">75.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Computer Science</span>
                      <span className="font-semibold text-green-600">85.4%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Reports */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <FileText className="w-4 h-4" />
                      Generate Reports
                    </CardTitle>
                    <CardDescription>Export and analyze data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Attendance Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="w-4 h-4 mr-2" />
                      Marks Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Subject Report
                    </Button>
                    <Button className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Export All Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Organized Dashboard</CardTitle>
            <CardDescription>
              A simple and clean dashboard where teachers can access all their teaching resources in one place
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Secure Access</CardTitle>
            <CardDescription>
              Data is protected and available only to authorized faculty and students with role-based permissions
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default ManagementTools;