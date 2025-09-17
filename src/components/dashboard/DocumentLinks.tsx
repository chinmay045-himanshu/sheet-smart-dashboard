import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Presentation, Table, Download } from "lucide-react";

interface DocumentLink {
  id: string;
  title: string;
  type: "pdf" | "slides" | "excel" | "doc";
  url: string;
  lastUpdated: string;
  size: string;
}

const mockDocuments: DocumentLink[] = [
  {
    id: "1",
    title: "Course Syllabus - Computer Science",
    type: "pdf",
    url: "#",
    lastUpdated: "2 hours ago",
    size: "2.1 MB"
  },
  {
    id: "2",
    title: "Mathematics Lecture Slides",
    type: "slides",
    url: "#",
    lastUpdated: "1 day ago",
    size: "5.3 MB"
  },
  {
    id: "3",
    title: "Student Marks Template",
    type: "excel",
    url: "https://docs.google.com/spreadsheets/d/1example",
    lastUpdated: "3 hours ago",
    size: "890 KB"
  },
  {
    id: "4",
    title: "Assignment Guidelines",
    type: "doc",
    url: "#",
    lastUpdated: "5 hours ago",
    size: "1.2 MB"
  }
];

const getDocumentIcon = (type: string) => {
  switch (type) {
    case "pdf": return <FileText className="h-5 w-5 text-destructive" />;
    case "slides": return <Presentation className="h-5 w-5 text-warning" />;
    case "excel": return <Table className="h-5 w-5 text-success" />;
    case "doc": return <FileText className="h-5 w-5 text-primary" />;
    default: return <FileText className="h-5 w-5" />;
  }
};

const getDocumentColor = (type: string) => {
  switch (type) {
    case "pdf": return "border-destructive/20 bg-destructive/5";
    case "slides": return "border-warning/20 bg-warning/5";
    case "excel": return "border-success/20 bg-success/5";
    case "doc": return "border-primary/20 bg-primary/5";
    default: return "border-border bg-muted/5";
  }
};

const DocumentLinks = () => {
  return (
    <Card className="bg-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            📁
          </div>
          Academic Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {mockDocuments.map((doc) => (
            <div
              key={doc.id}
              className={`p-4 rounded-lg border transition-academic hover:shadow-sm ${getDocumentColor(doc.type)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {getDocumentIcon(doc.type)}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-card-foreground truncate">
                      {doc.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span>Updated {doc.lastUpdated}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button size="sm" variant="outline" className="border-border hover:bg-muted">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => window.open(doc.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-dashed border-border">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              📝 Google Sheets Integration
            </p>
            <p className="text-xs text-muted-foreground">
              Connect your Google Sheets to automatically sync marks data in real-time
            </p>
            <Button variant="outline" size="sm" className="border-border hover:bg-muted">
              Configure Integration
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentLinks;