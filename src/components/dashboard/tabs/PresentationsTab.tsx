import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

export const PresentationsTab = () => {
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
    <div className="space-y-4">
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
    </div>
  );
};