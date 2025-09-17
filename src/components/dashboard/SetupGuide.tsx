import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink, Copy } from "lucide-react";
import { useState } from "react";

const SetupGuide = () => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  
  const spreadsheetId = "1uvHqP0dFe9TsXyJPflYHFaUrcSXKxLH1aH-nJyNiO-E";

  const copyToClipboard = (text: string, stepNumber: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepNumber);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const steps = [
    {
      title: "Get Google Sheets API Key",
      description: "Create a Google Cloud project and enable Sheets API",
      action: "Visit Google Cloud Console",
      link: "https://console.cloud.google.com/apis/credentials"
    },
    {
      title: "Configure Sheet Structure",
      description: "Your sheet should have columns: SR.NO, ENROLMENT NO, NAME OF STUDENT",
      action: "Open Your Sheet",
      link: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
    },
    {
      title: "Add Marks Columns",
      description: "Add subject columns with marks data (Mathematics, Physics, Chemistry, etc.)",
      action: "Edit Sheet Structure"
    },
    {
      title: "Enable Public Access",
      description: "Make your sheet viewable by anyone with the link for API access",
      action: "Share Settings"
    }
  ];

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-success" />
          Google Sheets Integration Setup
          <Badge variant="outline" className="bg-success/10 text-success border-success/30">
            Government Polytechnic Arvi
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="font-semibold text-primary mb-2">Current Spreadsheet</h3>
            <div className="flex items-center gap-2">
              <code className="bg-background px-2 py-1 rounded text-sm">
                {spreadsheetId}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(spreadsheetId, 0)}
              >
                {copiedStep === 0 ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                <div className="p-2 rounded-full bg-primary/10 text-primary font-bold text-sm min-w-[2rem] text-center">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  {step.link && (
                    <Button variant="outline" size="sm" asChild className="mt-2">
                      <a href={step.link} target="_blank" rel="noopener noreferrer">
                        {step.action}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-muted/50 border border-border rounded-lg">
            <h4 className="font-semibold mb-2">Expected Sheet Structure:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 border-r">A</th>
                    <th className="text-left p-2 border-r">B</th>
                    <th className="text-left p-2 border-r">C</th>
                    <th className="text-left p-2">D+</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 border-r font-mono">SR.NO.</td>
                    <td className="p-2 border-r font-mono">ENROLMENT NO.</td>
                    <td className="p-2 border-r font-mono">NAME OF STUDENT</td>
                    <td className="p-2 font-mono">Subject Marks...</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r">1</td>
                    <td className="p-2 border-r">24310250201</td>
                    <td className="p-2 border-r">THAKARE KARTIK DEVIDAS</td>
                    <td className="p-2">85, 78, 92...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SetupGuide;