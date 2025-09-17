// Google Sheets API service for fetching real-time student data
// You'll need to set up a Google Cloud project and get an API key

export interface StudentData {
  id: string;
  enrollmentNo: string;
  name: string;
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

class GoogleSheetsService {
  private apiKey: string;
  private spreadsheetId: string;
  
  constructor() {
    // For now, we'll use environment variable or prompt user to add API key
    this.apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';
    this.spreadsheetId = '1uvHqP0dFe9TsXyJPflYHFaUrcSXKxLH1aH-nJyNiO-E';
  }

  async fetchStudentData(): Promise<StudentData[]> {
    if (!this.apiKey) {
      console.warn('Google Sheets API key not found. Using mock data.');
      return this.getMockData();
    }

    try {
      // Fetch student names and enrollment numbers
      const studentsRange = 'Sheet1!A:C'; // Assuming columns A, B, C contain SR.NO, ENROLMENT NO, NAME
      const studentsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${studentsRange}?key=${this.apiKey}`;
      
      const studentsResponse = await fetch(studentsUrl);
      const studentsData = await studentsResponse.json();

      if (!studentsData.values) {
        throw new Error('No student data found');
      }

      // Skip header row and process student data
      const students = studentsData.values.slice(1).filter((row: any[]) => row[1] && row[2]);
      
      // For now, we'll generate sample marks data
      // In a real implementation, you'd fetch marks from additional sheets or columns
      const studentsWithMarks: StudentData[] = students.map((row: any[], index: number) => ({
        id: (index + 1).toString(),
        enrollmentNo: row[1] || '',
        name: row[2] || '',
        subjects: this.generateSampleMarks(),
        attendance: Math.floor(Math.random() * 20) + 80 // Random attendance 80-100%
      }));

      return studentsWithMarks;
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
      return this.getMockData();
    }
  }

  private generateSampleMarks() {
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science'];
    const marks: { [key: string]: any } = {};
    
    subjects.forEach(subject => {
      const marksObtained = Math.floor(Math.random() * 30) + 70; // Random marks 70-100
      marks[subject] = {
        marks: marksObtained,
        total: 100,
        percentage: marksObtained,
        grade: this.calculateGrade(marksObtained)
      };
    });
    
    return marks;
  }

  private calculateGrade(percentage: number): string {
    if (percentage >= 95) return 'A+';
    if (percentage >= 85) return 'A';
    if (percentage >= 80) return 'A-';
    if (percentage >= 75) return 'B+';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C+';
    if (percentage >= 50) return 'C';
    return 'F';
  }

  private getMockData(): StudentData[] {
    return [
      {
        id: "1",
        enrollmentNo: "24310250225",
        name: "BOKEY HIMANSHU SURENDRA",
        subjects: {
          "Mathematics": { marks: 85, total: 100, percentage: 85, grade: "A" },
          "Physics": { marks: 78, total: 100, percentage: 78, grade: "B+" },
          "Chemistry": { marks: 92, total: 100, percentage: 92, grade: "A+" },
          "English": { marks: 88, total: 100, percentage: 88, grade: "A" },
          "Computer Science": { marks: 94, total: 100, percentage: 94, grade: "A+" },
        },
        attendance: 95
      },
      {
        id: "2",
        enrollmentNo: "24310250202",
        name: "MRUNAL PRAVIN JAGTAP",
        subjects: {
          "Mathematics": { marks: 76, total: 100, percentage: 76, grade: "B+" },
          "Physics": { marks: 82, total: 100, percentage: 82, grade: "A-" },
          "Chemistry": { marks: 88, total: 100, percentage: 88, grade: "A" },
          "English": { marks: 79, total: 100, percentage: 79, grade: "B+" },
          "Computer Science": { marks: 86, total: 100, percentage: 86, grade: "A" },
        },
        attendance: 88
      },
      {
        id: "3",
        enrollmentNo: "24310250203",
        name: "UKANDE JAYANT MANGLESH",
        subjects: {
          "Mathematics": { marks: 94, total: 100, percentage: 94, grade: "A+" },
          "Physics": { marks: 89, total: 100, percentage: 89, grade: "A" },
          "Chemistry": { marks: 91, total: 100, percentage: 91, grade: "A+" },
          "English": { marks: 85, total: 100, percentage: 85, grade: "A" },
          "Computer Science": { marks: 92, total: 100, percentage: 92, grade: "A+" },
        },
        attendance: 97
      }
    ];
  }

  async setupApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('googleSheetsApiKey', apiKey);
  }

  isApiKeyConfigured(): boolean {
    return !!this.apiKey || !!localStorage.getItem('googleSheetsApiKey');
  }
}

export const googleSheetsService = new GoogleSheetsService();