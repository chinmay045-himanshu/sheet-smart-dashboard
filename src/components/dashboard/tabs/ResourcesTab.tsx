import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Upload, FileText, Link, Download } from "lucide-react";

const subjects = [
  "Computer Graphics",
  "Data Structure Using C", 
  "Object Oriented Programming",
  "DBMS Data Base Management System"
];

export const ResourcesTab = () => {
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceDescription, setResourceDescription] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const { toast } = useToast();

  const handleResourceUpload = () => {
    if (!resourceTitle || !selectedSubject) {
      toast({
        title: "Missing Information",
        description: "Please fill required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Resource Added",
      description: `${resourceTitle} has been added to ${selectedSubject}`,
    });

    // Reset form
    setResourceTitle("");
    setResourceDescription("");
    setSelectedSubject("");
    setResourceLink("");
  };

  const handleLinkAdd = () => {
    if (!resourceTitle || !resourceLink || !selectedSubject) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields for link resource",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Link Added",
      description: `Resource link added for ${selectedSubject}`,
    });

    // Reset form
    setResourceTitle("");
    setResourceDescription("");
    setSelectedSubject("");
    setResourceLink("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Upload Resources */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Upload Study Materials
          </CardTitle>
          <CardDescription>Add notes, references, and study materials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Subject</Label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Resource Title</Label>
            <Input 
              placeholder="Enter resource title"
              value={resourceTitle}
              onChange={(e) => setResourceTitle(e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea 
              placeholder="Brief description of the resource"
              value={resourceDescription}
              onChange={(e) => setResourceDescription(e.target.value)}
            />
          </div>
          <div>
            <Label>Upload File</Label>
            <Input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" />
          </div>
          <Button onClick={handleResourceUpload} className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            Upload Resource
          </Button>
        </CardContent>
      </Card>

      {/* Add Links */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            Add Resource Links
          </CardTitle>
          <CardDescription>Share useful web resources and links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Subject</Label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Link Title</Label>
            <Input 
              placeholder="Enter link title"
              value={resourceTitle}
              onChange={(e) => setResourceTitle(e.target.value)}
            />
          </div>
          <div>
            <Label>Resource URL</Label>
            <Input 
              placeholder="https://example.com"
              type="url"
              value={resourceLink}
              onChange={(e) => setResourceLink(e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea 
              placeholder="Brief description of the resource"
              value={resourceDescription}
              onChange={(e) => setResourceDescription(e.target.value)}
            />
          </div>
          <Button onClick={handleLinkAdd} className="w-full">
            <Link className="w-4 h-4 mr-2" />
            Add Link
          </Button>
        </CardContent>
      </Card>

      {/* Resource Library */}
      <Card className="border-primary/20 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Resource Library
          </CardTitle>
          <CardDescription>Manage uploaded resources and links</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3">{subject}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                    <div>
                      <div className="font-medium text-sm">Chapter 1 Notes</div>
                      <div className="text-xs text-muted-foreground">PDF • 2.3 MB</div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                    <div>
                      <div className="font-medium text-sm">Practice Problems</div>
                      <div className="text-xs text-muted-foreground">DOCX • 1.1 MB</div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                    <div>
                      <div className="font-medium text-sm">Online Tutorial</div>
                      <div className="text-xs text-muted-foreground">External Link</div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Link className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};