import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Database, FileText, Upload } from "lucide-react";

const subjects = [
  "Computer Graphics",
  "Data Structure Using C", 
  "Object Oriented Programming",
  "DBMS Data Base Management System"
];

const students = [
  "THAKARE KARTIK DEVIDAS (24310250201)",
  "MRUNAL PRAVIN JAGTAP (24310250202)",
  "UKANDE JAYANT MANGLESH (24310250203)",
  "BAWANKAR SANVED RAJENDRA (24310250204)",
  "THAKARE KALASH RAVINDRA (24310250205)",
  "LADE PAVAN RAJENDRA (24310250206)",
  "CHOPADE PIYUSH GHANSHYAM (24310250207)",
  "DESHMUKH SAURABH AVINASH (24310250208)",
  "BAKALE AYUSH PRAKASH (24310250209)",
  "BHANDWALKAR SACHIN YUDHISHTIR (24310250210)",
  "THAKARE SANCHITA SANJAY (24310250211)",
  "MISHRA ANURAG VIJAYPRAKASH (24310250212)",
  "KAMATKAR NANDINI YOGESH (24310250213)",
  "VARMA LAKSH SANTOSH (24310250214)",
  "PENSHANWAR JANHAVI PRASHANT (24310250215)",
  "DAHIWADE SHREYA GOPAL (24310250216)",
  "DEWASE JAYASHRI TEJRAO (24310250217)",
  "BUTTE MUKTA VISHWAS (24310250218)",
  "PANGARE ROHINI SANTOSH (24310250219)",
  "AMBADARE PREMILA DIVAKAR (24310250220)",
  "SHAIKH RIZA ANSAR (24310250222)",
  "CHAVHAN SHRIHARI PRADYUMNA (24310250223)",
  "SIRSAT SEJAL PRAFUL (24310250224)",
  "BOKEY HIMANSHU SURENDRA (24310250225)",
  "MOTGHARE PIYUSH SUDHAKAR (24310250226)",
  "DHOMANE NOMESH VISHWESHWAR (24310250227)",
  "DOBALE MANAS PADMAKAR (24310250228)",
  "CHAVHAN CHETANA ONKAR (24310250229)",
  "JOMDE SHRAVANI RAVSAHEB (24310250230)",
  "GHAGARE CHETAN ATUL (24310250231)",
  "PATIL SHRAVANI LUMAKAR (24310250232)",
  "MISHRA NIDHI VISHUPRASHAD (24310250233)",
  "HINGWE SHWETA AJAB (24310250234)",
  "BAKALE SANIKA PRADIP (24310250236)",
  "CHANPURE PRAFUL DIPAKRAO (24310250237)",
  "TUMSARE SALONI HEMRAJ (24310250238)",
  "PATIL SAUMYA PRAVIN (24310250239)",
  "NERKAR PRERNA SAMIR (24310250240)",
  "WANKHADE HIMANSHU AVINASH (24310250241)",
  "MAHORE ARYAN MOHAN (24310250243)",
  "DEVGHARE SWARUPA RAM (24310250244)",
  "DONGRE NAMAN SUNIL (24310250245)",
  "KADAM OMKAR GOVINDRAO (24310250246)",
  "PIMPLE TUSHAR TUKARAM (24310250247)",
  "BODHALE MANTHAN MAHADEV (24310250248)",
  "SHIRPURKAR VEDASHREE PRASHANT (24310250249)",
  "KALPANDE TANAYA DILIP (24310250250)",
  "NIGHOT SHRAVANI NANDKISHOR (24310250251)",
  "AJMIRE SIMRAN HEMANT (24310250252)",
  "KALE RUSHALI SANDIP (24310250253)",
  "DHAWALE VAISHANAVI BALAJI (24310250254)",
  "KATAKPURE NISHA RAJENDRA (24310250255)",
  "KSHIRSAGAR PAYAL DIPAK (24310250256)",
  "JASUTKAR TEJASWINI MOHAN (24310250257)",
  "JUMORE KRISH SUMEDH (24310250258)",
  "ZADE SANSKRUTI SANJAY (24310250259)",
  "BARDE ARYA PRAKASH (24310250260)",
  "MOKASHI CHERITA ARVIND (24310250261)",
  "KANGALE UMA PANDHARI (24310250262)",
  "MANOHARE SHRUTI UMESH (24310250263)",
  "KHAIRE AKANKSHA PRAMOD (24310250264)",
  "KUYATE ANIKET GANGADHAR (24310250265)",
  "KHALOKARTANVI MOHAN (24310250271)",
  "LONKAR SAKSHI KAMLAKAR (24310250427)",
  "ADHAU ANIKET NIRANJAN",
  "ECHORE SIDDHESH MANOJ",
  "SAWNERKAR DNYANESHWAR AJAY",
  "SHIVAM BHANGE",
  "NAGPURE PRANJALI SHALIKRAO",
  "NEVHAL VAIBHAV BHARAT",
  "BORULE GAURI VISHAL"
];

export const MarksTab = () => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [examType, setExamType] = useState("");
  const [marksObtained, setMarksObtained] = useState("");
  const [totalMarks, setTotalMarks] = useState("100");
  const [remarks, setRemarks] = useState("");
  const { toast } = useToast();

  const handleSaveMarks = () => {
    if (!selectedStudent || !selectedSubject || !examType || !marksObtained) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Marks Saved",
      description: `Marks saved for ${selectedStudent.split(' (')[0]} in ${selectedSubject}`,
    });

    // Reset form
    setSelectedStudent("");
    setSelectedSubject("");
    setExamType("");
    setMarksObtained("");
    setRemarks("");
  };

  const handleBulkImport = () => {
    toast({
      title: "Bulk Import",
      description: "Bulk marks import feature activated",
    });
  };

  return (
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
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">Select a student...</option>
                {students.map((student, index) => (
                  <option key={index} value={student}>{student}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
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
                <Label htmlFor="exam-type">Exam Type</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="Unit Test 1">Unit Test 1</option>
                  <option value="Unit Test 2">Unit Test 2</option>
                  <option value="Mid-Term">Mid-Term</option>
                  <option value="Final Exam">Final Exam</option>
                  <option value="Assignment">Assignment</option>
                  <option value="Project">Project</option>
                </select>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="marks-obtained">Marks Obtained</Label>
                <Input 
                  id="marks-obtained" 
                  type="number" 
                  placeholder="0" 
                  max="100"
                  value={marksObtained}
                  onChange={(e) => setMarksObtained(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="total-marks">Total Marks</Label>
                <Input 
                  id="total-marks" 
                  type="number" 
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="remarks">Remarks (Optional)</Label>
              <Textarea 
                id="remarks" 
                placeholder="Add any remarks about performance..." 
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button className="flex-1" onClick={handleSaveMarks}>
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
                <option value="">Select Subject</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
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
          <Button variant="outline" className="mt-4" onClick={handleBulkImport}>
            <Upload className="w-4 h-4 mr-2" />
            Import Bulk Marks
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};