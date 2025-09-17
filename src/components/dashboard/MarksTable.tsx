import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  subjects: {
    [key: string]: {
      marks: number;
      total: number;
      percentage: number;
      grade: string;
    };
  };
  attendance: number;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Himanshu Bokey",
    rollNumber: "21CS001",
    subjects: {
      "Mathematics": { marks: 85, total: 100, percentage: 85, grade: "A" },
      "Physics": { marks: 78, total: 100, percentage: 78, grade: "B+" },
      "Chemistry": { marks: 92, total: 100, percentage: 92, grade: "A+" },
      "English": { marks: 88, total: 100, percentage: 88, grade: "A" },
    },
    attendance: 95
  },
  {
    id: "2",
    name: "Monal Torne",
    rollNumber: "21CS002",
    subjects: {
      "Mathematics": { marks: 76, total: 100, percentage: 76, grade: "B+" },
      "Physics": { marks: 82, total: 100, percentage: 82, grade: "A-" },
      "Chemistry": { marks: 88, total: 100, percentage: 88, grade: "A" },
      "English": { marks: 79, total: 100, percentage: 79, grade: "B+" },
    },
    attendance: 88
  },
  {
    id: "3",
    name: "Dhoke Student",
    rollNumber: "21CS003",
    subjects: {
      "Mathematics": { marks: 94, total: 100, percentage: 94, grade: "A+" },
      "Physics": { marks: 89, total: 100, percentage: 89, grade: "A" },
      "Chemistry": { marks: 91, total: 100, percentage: 91, grade: "A+" },
      "English": { marks: 85, total: 100, percentage: 85, grade: "A" },
    },
    attendance: 97
  }
];

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
  const subjects = Object.keys(mockStudents[0]?.subjects || {});

  return (
    <Card className="bg-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            📊
          </div>
          Student Marks Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
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
              {mockStudents.map((student) => (
                <tr key={student.id} className="border-b border-border/50 hover:bg-muted/30 transition-academic">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-card-foreground">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
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
      </CardContent>
    </Card>
  );
};

export default MarksTable;