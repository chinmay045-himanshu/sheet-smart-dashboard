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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="presentations">Presentations</TabsTrigger>
              <TabsTrigger value="marks">Marks Entry</TabsTrigger>
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
              <div className="text-center py-8">
                <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Marks Management</h3>
                <p className="text-muted-foreground mb-4">
                  Connected to Google Sheets for real-time marks management
                </p>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Open Marks Sheet
                </Button>
              </div>
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