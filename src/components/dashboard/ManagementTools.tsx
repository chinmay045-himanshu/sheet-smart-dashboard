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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="presentations">Presentations</TabsTrigger>
              <TabsTrigger value="marks">Marks & Attendance</TabsTrigger>
              <TabsTrigger value="attendance">Quick Attendance</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Marks Entry
                    </CardTitle>
                    <CardDescription>Record and update student marks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="student-select">Select Student</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option>Select a student...</option>
                        <option>THAKARE KARTIK DEVIDAS (24310250201)</option>
                        <option>MRUNAL PRAVIN JAGTAP (24310250202)</option>
                        <option>UKANDE JAYANT MANGLESH (24310250203)</option>
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
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="marks">Marks</Label>
                        <Input id="marks" type="number" placeholder="Enter marks" max="100" />
                      </div>
                    </div>
                    <Button className="w-full">
                      <Database className="w-4 h-4 mr-2" />
                      Update Marks
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Attendance Management
                    </CardTitle>
                    <CardDescription>Track and update student attendance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="attendance-date">Date</Label>
                      <Input id="attendance-date" type="date" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="attendance-subject">Subject</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>English</option>
                        <option>Computer Science</option>
                      </select>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Students: 71 | Present: 65 | Absent: 6
                    </div>
                    <Button className="w-full">
                      <Shield className="w-4 h-4 mr-2" />
                      Mark Attendance
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="attendance" className="space-y-4">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Quick Attendance</CardTitle>
                  <CardDescription>Mark attendance for all 71 students of CO-3-K</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quick-date">Date</Label>
                      <Input id="quick-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div>
                      <Label htmlFor="quick-subject">Subject</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>English</option>
                        <option>Computer Science</option>
                      </select>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="text-sm font-medium mb-2">Student List (First 10 shown)</div>
                    <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                      {['THAKARE KARTIK DEVIDAS', 'MRUNAL PRAVIN JAGTAP', 'UKANDE JAYANT MANGLESH', 'BAWANKAR SANVED RAJENDRA', 'THAKARE KALASH RAVINDRA', 'LADE PAVAN RAJENDRA', 'CHOPADE PIYUSH GHANSHYAM', 'DESHMUKH SAURABH AVINASH', 'BAKALE AYUSH PRAKASH', 'BHANDWALKAR SACHIN YUDHISHTIR'].map((name, i) => (
                        <div key={i} className="flex items-center justify-between py-1">
                          <span className="text-sm">{name}</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-6 px-2 text-xs">P</Button>
                            <Button size="sm" variant="outline" className="h-6 px-2 text-xs">A</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">...and 61 more students</div>
                  </div>
                  <Button className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Save Attendance (71 Students)
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4">
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Resource Library</h3>
                <p className="text-muted-foreground mb-4">
                  Manage and organize teaching resources, notes, and study materials
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Notes
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    View Library
                  </Button>
                </div>
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