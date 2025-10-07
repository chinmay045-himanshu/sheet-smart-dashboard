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
  { id: "24310250210", name: "BHANDWALKAR SACHIN YUDHISHTIR" },
  { id: "24310250211", name: "THAKARE SANCHITA SANJAY" },
  { id: "24310250212", name: "MISHRA ANURAG VIJAYPRAKASH" },
  { id: "24310250213", name: "KAMATKAR NANDINI YOGESH" },
  { id: "24310250214", name: "VARMA LAKSH SANTOSH" },
  { id: "24310250215", name: "PENSHANWAR JANHAVI PRASHANT" },
  { id: "24310250216", name: "DAHIWADE SHREYA GOPAL" },
  { id: "24310250217", name: "DEWASE JAYASHRI TEJRAO" },
  { id: "24310250218", name: "BUTTE MUKTA VISHWAS" },
  { id: "24310250219", name: "PANGARE ROHINI SANTOSH" },
  { id: "24310250220", name: "AMBADARE PREMILA DIVAKAR" },
  { id: "24310250222", name: "SHAIKH RIZA ANSAR" },
  { id: "24310250223", name: "CHAVHAN SHRIHARI PRADYUMNA" },
  { id: "24310250224", name: "SIRSAT SEJAL PRAFUL" },
  { id: "24310250225", name: "BOKEY HIMANSHU SURENDRA" },
  { id: "24310250226", name: "MOTGHARE PIYUSH SUDHAKAR" },
  { id: "24310250227", name: "DHOMANE NOMESH VISHWESHWAR" },
  { id: "24310250228", name: "DOBALE MANAS PADMAKAR" },
  { id: "24310250229", name: "CHAVHAN CHETANA ONKAR" },
  { id: "24310250230", name: "JOMDE SHRAVANI RAVSAHEB" },
  { id: "24310250231", name: "GHAGARE CHETAN ATUL" },
  { id: "24310250232", name: "PATIL SHRAVANI LUMAKAR" },
  { id: "24310250233", name: "MISHRA NIDHI VISHUPRASHAD" },
  { id: "24310250234", name: "HINGWE SHWETA AJAB" },
  { id: "24310250236", name: "BAKALE SANIKA PRADIP" },
  { id: "24310250237", name: "CHANPURE PRAFUL DIPAKRAO" },
  { id: "24310250238", name: "TUMSARE SALONI HEMRAJ" },
  { id: "24310250239", name: "PATIL SAUMYA PRAVIN" },
  { id: "24310250240", name: "NERKAR PRERNA SAMIR" },
  { id: "24310250241", name: "WANKHADE HIMANSHU AVINASH" },
  { id: "24310250243", name: "MAHORE ARYAN MOHAN" },
  { id: "24310250244", name: "DEVGHARE SWARUPA RAM" },
  { id: "24310250245", name: "DONGRE NAMAN SUNIL" },
  { id: "24310250246", name: "KADAM OMKAR GOVINDRAO" },
  { id: "24310250247", name: "PIMPLE TUSHAR TUKARAM" },
  { id: "24310250248", name: "BODHALE MANTHAN MAHADEV" },
  { id: "24310250249", name: "SHIRPURKAR VEDASHREE PRASHANT" },
  { id: "24310250250", name: "KALPANDE TANAYA DILIP" },
  { id: "24310250251", name: "NIGHOT SHRAVANI NANDKISHOR" },
  { id: "24310250252", name: "AJMIRE SIMRAN HEMANT" },
  { id: "24310250253", name: "KALE RUSHALI SANDIP" },
  { id: "24310250254", name: "DHAWALE VAISHANAVI BALAJI" },
  { id: "24310250255", name: "KATAKPURE NISHA RAJENDRA" },
  { id: "24310250256", name: "KSHIRSAGAR PAYAL DIPAK" },
  { id: "24310250257", name: "JASUTKAR TEJASWINI MOHAN" },
  { id: "24310250258", name: "JUMORE KRISH SUMEDH" },
  { id: "24310250259", name: "ZADE SANSKRUTI SANJAY" },
  { id: "24310250260", name: "BARDE ARYA PRAKASH" },
  { id: "24310250261", name: "MOKASHI CHERITA ARVIND" },
  { id: "24310250262", name: "KANGALE UMA PANDHARI" },
  { id: "24310250263", name: "MANOHARE SHRUTI UMESH" },
  { id: "24310250264", name: "KHAIRE AKANKSHA PRAMOD" },
  { id: "24310250265", name: "KUYATE ANIKET GANGADHAR" },
  { id: "24310250271", name: "KHALOKARTANVI MOHAN" },
  { id: "24310250427", name: "LONKAR SAKSHI KAMLAKAR" },
  { id: "65", name: "ADHAU ANIKET NIRANJAN" },
  { id: "66", name: "ECHORE SIDDHESH MANOJ" },
  { id: "67", name: "SAWNERKAR DNYANESHWAR AJAY" },
  { id: "68", name: "SHIVAM BHANGE" },
  { id: "69", name: "NAGPURE PRANJALI SHALIKRAO" },
  { id: "70", name: "NEVHAL VAIBHAV BHARAT" },
  { id: "71", name: "BORULE GAURI VISHAL" }
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
          <CardTitle>Student List - CO-3-K Branch ({students.length} Students)</CardTitle>
          <CardDescription>
            {selectedSubject && selectedPeriod 
              ? `Marking attendance for ${selectedSubject} - ${selectedPeriod}`
              : "Select subject and period above, then mark attendance"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {students.map((student, index) => {
              const isPresent = attendance[student.id] === true;
              const isAbsent = attendance[student.id] === false;
              
              return (
                <div 
                  key={student.id} 
                  className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                    isPresent ? 'bg-green-50 dark:bg-green-950/20 border-green-500' : 
                    isAbsent ? 'bg-red-50 dark:bg-red-950/20 border-red-500' : 
                    'hover:bg-muted/50 border-border'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="text-sm font-semibold text-muted-foreground w-8">{index + 1}.</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-base">{student.name}</div>
                      {student.id && <div className="text-sm text-muted-foreground">{student.id}</div>}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant={isPresent ? "default" : "outline"}
                      onClick={() => handleAttendanceChange(student.id, true)}
                      className="h-10 w-20"
                      title="Mark Present"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant={isAbsent ? "destructive" : "outline"}
                      onClick={() => handleAttendanceChange(student.id, false)}
                      className="h-10 w-20"
                      title="Mark Absent"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Absent
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};