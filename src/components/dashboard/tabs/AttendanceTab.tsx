import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield, FileText, Database, Check, X } from "lucide-react";

const subjects = [
  "Computer Graphics",
  "Data Structure Using C", 
  "Object Oriented Programming",
  "DBMS Data Base Management System"
];

const students = [
  { id: "24310250201", name: "THAKARE KARTIK DEVIDAS" },
  { id: "24310250202", name: "MRUNAL PRAVIN JAGTAP" },
  { id: "24310250203", name: "UKANDE JAYANT MANGLESH" },
  { id: "24310250204", name: "BAWANKAR SANVED RAJENDRA" },
  { id: "24310250205", name: "THAKARE KALASH RAVINDRA" },
  { id: "24310250206", name: "LADE PAVAN RAJENDRA" },
  { id: "24310250207", name: "CHOPADE PIYUSH GHANSHYAM" },
  { id: "24310250208", name: "DESHMUKH SAURABH AVINASH" },
  { id: "24310250209", name: "BAKALE AYUSH PRAKASH" },
  { id: "24310250210", name: "BHANDWALKAR SACHIN YUDHISHTIR" }
];

export const AttendanceTab = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [attendance, setAttendance] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  const handleAttendanceChange = (studentId: string, present: boolean) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: present
    }));
  };

  const markAllPresent = () => {
    const allPresent = students.reduce((acc, student) => {
      acc[student.id] = true;
      return acc;
    }, {} as {[key: string]: boolean});
    setAttendance(allPresent);
    toast({
      title: "Marked All Present",
      description: "All students marked as present",
    });
  };

  const saveAttendance = () => {
    if (!selectedSubject || !selectedPeriod) {
      toast({
        title: "Missing Information",
        description: "Please select subject and period",
        variant: "destructive",
      });
      return;
    }

    const presentCount = Object.values(attendance).filter(Boolean).length;
    const absentCount = students.length - presentCount;

    toast({
      title: "Attendance Saved",
      description: `Present: ${presentCount}, Absent: ${absentCount}`,
    });
  };

  return (
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
              <Input 
                id="attendance-date" 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="attendance-subject">Subject/Period</Label>
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
              <Label htmlFor="time-period">Time Period</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="">Select Period</option>
                <option value="1st Period (9:00-10:00)">1st Period (9:00-10:00)</option>
                <option value="2nd Period (10:00-11:00)">2nd Period (10:00-11:00)</option>
                <option value="3rd Period (11:15-12:15)">3rd Period (11:15-12:15)</option>
                <option value="4th Period (12:15-13:15)">4th Period (12:15-13:15)</option>
                <option value="5th Period (14:00-15:00)">5th Period (14:00-15:00)</option>
                <option value="6th Period (15:00-16:00)">6th Period (15:00-16:00)</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
            <div className="flex justify-between">
              <span>Total Students: {students.length}</span>
              <span>Present: {Object.values(attendance).filter(Boolean).length}</span>
              <span>Absent: {students.length - Object.values(attendance).filter(Boolean).length}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={saveAttendance}>
              <Shield className="w-4 h-4 mr-2" />
              Save Attendance
            </Button>
            <Button variant="outline" onClick={markAllPresent}>
              Mark All Present
            </Button>
          </div>
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
            <Button variant="outline" className="h-20 flex-col" onClick={markAllPresent}>
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

      {/* Student List for Attendance */}
      <Card className="border-primary/20 lg:col-span-2">
        <CardHeader>
          <CardTitle>Student List - CO-3-K Branch</CardTitle>
          <CardDescription>Click buttons to mark attendance for each student</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-sm">{student.name}</div>
                  <div className="text-xs text-muted-foreground">{student.id}</div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={attendance[student.id] === true ? "default" : "outline"}
                    onClick={() => handleAttendanceChange(student.id, true)}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={attendance[student.id] === false ? "destructive" : "outline"}
                    onClick={() => handleAttendanceChange(student.id, false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};