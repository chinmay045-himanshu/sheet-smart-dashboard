import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGoogleSheets } from "@/hooks/useGoogleSheets";
import { Loader2, RefreshCw, Wifi, WifiOff } from "lucide-react";
import ApiKeySetup from "./ApiKeySetup";

const getGradeColor = (grade: string) => {
  switch (grade) {
    case "A+": return "bg-success text-success-foreground";
    case "A": return "bg-primary text-primary-foreground";
    case "A-": case "B+": return "bg-warning text-warning-foreground";
    case "B": return "bg-secondary text-secondary-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const MarksTable = () => {
  const { students, loading, error, lastUpdated, refresh, isApiKeyConfigured } = useGoogleSheets();
  
  if (!isApiKeyConfigured) {
    return <ApiKeySetup onSetup={() => window.location.reload()} />;
  }

  const subjects = Object.keys(students[0]?.subjects || {});

  return (
    <Card className="bg-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              📊
            </div>
            <div>
              <p>Student Marks Overview</p>
              <p className="text-sm font-normal text-muted-foreground">
                Government Polytechnic Arvi • CO-3-K • AY 2025-26
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Syncing...
                </>
              ) : error ? (
                <>
                  <WifiOff className="h-4 w-4 text-destructive" />
                  Connection Error
                </>
              ) : (
                <>
                  <Wifi className="h-4 w-4 text-success" />
                  {lastUpdated && (
                    <span>
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </span>
                  )}
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refresh}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-semibold text-muted-foreground">Student</th>
                {subjects.map((subject) => (
                  <th key={subject} className="text-center p-4 font-semibold text-muted-foreground">
                    {subject}
                  </th>
                ))}
                <th className="text-center p-4 font-semibold text-muted-foreground">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-border/50 hover:bg-muted/30 transition-academic">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {student.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-card-foreground">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.enrollmentNo}</p>
                      </div>
                    </div>
                  </td>
                  {subjects.map((subject) => {
                    const subjectData = student.subjects[subject];
                    return (
                      <td key={subject} className="text-center p-4">
                        <div className="space-y-1">
                          <p className="font-semibold text-card-foreground">
                            {subjectData.marks}/{subjectData.total}
                          </p>
                          <Badge className={getGradeColor(subjectData.grade)}>
                            {subjectData.grade}
                          </Badge>
                        </div>
                      </td>
                    );
                  })}
                  <td className="text-center p-4">
                    <Badge className={
                      student.attendance >= 90 
                        ? "bg-success text-success-foreground" 
                        : student.attendance >= 75 
                        ? "bg-warning text-warning-foreground"
                        : "bg-destructive text-destructive-foreground"
                    }>
                      {student.attendance}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {students.length === 0 && !loading && (
          <div className="text-center py-8 text-muted-foreground">
            No student data found. Please check your Google Sheets connection.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarksTable;