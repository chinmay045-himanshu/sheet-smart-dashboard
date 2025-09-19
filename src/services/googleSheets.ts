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
    // Get API key from localStorage or environment
    this.apiKey = localStorage.getItem('googleSheetsApiKey') || import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';
    // Connected Google Sheets URL: https://docs.google.com/spreadsheets/d/1uvHqP0dFe9TsXyJPflYHFaUrcSXKxLH1aH-nJyNiO-E/edit?usp=drivesdk
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
      { id: "1", enrollmentNo: "24310250201", name: "THAKARE KARTIK DEVIDAS", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "2", enrollmentNo: "24310250202", name: "MRUNAL PRAVIN JAGTAP", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "3", enrollmentNo: "24310250203", name: "UKANDE JAYANT MANGLESH", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "4", enrollmentNo: "24310250204", name: "BAWANKAR SANVED RAJENDRA", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "5", enrollmentNo: "24310250205", name: "THAKARE KALASH RAVINDRA", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "6", enrollmentNo: "24310250206", name: "LADE PAVAN RAJENDRA", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "7", enrollmentNo: "24310250207", name: "CHOPADE PIYUSH GHANSHYAM", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "8", enrollmentNo: "24310250208", name: "DESHMUKH SAURABH AVINASH", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "9", enrollmentNo: "24310250209", name: "BAKALE AYUSH PRAKASH", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "10", enrollmentNo: "24310250210", name: "BHANDWALKAR SACHIN YUDHISHTIR", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "11", enrollmentNo: "24310250211", name: "THAKARE SANCHITA SANJAY", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "12", enrollmentNo: "24310250212", name: "MISHRA ANURAG VIJAYPRAKASH", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "13", enrollmentNo: "24310250213", name: "KAMATKAR NANDINI YOGESH", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "14", enrollmentNo: "24310250214", name: "VARMA LAKSH SANTOSH", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "15", enrollmentNo: "24310250215", name: "PENSHANWAR JANHAVI PRASHANT", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "16", enrollmentNo: "24310250216", name: "DAHIWADE SHREYA GOPAL", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "17", enrollmentNo: "24310250217", name: "DEWASE JAYASHRI TEJRAO", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "18", enrollmentNo: "24310250218", name: "BUTTE MUKTA VISHWAS", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "19", enrollmentNo: "24310250219", name: "PANGARE ROHINI SANTOSH", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "20", enrollmentNo: "24310250220", name: "AMBADARE PREMILA DIVAKAR", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "21", enrollmentNo: "24310250222", name: "SHAIKH RIZA ANSAR", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "22", enrollmentNo: "24310250223", name: "CHAVHAN SHRIHARI PRADYUMNA", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "23", enrollmentNo: "24310250224", name: "SIRSAT SEJAL PRAFUL", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "24", enrollmentNo: "24310250225", name: "BOKEY HIMANSHU SURENDRA", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "25", enrollmentNo: "24310250226", name: "MOTGHARE PIYUSH SUDHAKAR", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "26", enrollmentNo: "24310250227", name: "DHOMANE NOMESH VISHWESHWAR", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "27", enrollmentNo: "24310250228", name: "DOBALE MANAS PADMAKAR", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "28", enrollmentNo: "24310250229", name: "CHAVHAN CHETANA ONKAR", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "29", enrollmentNo: "24310250230", name: "JOMDE SHRAVANI RAVSAHEB", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "30", enrollmentNo: "24310250231", name: "GHAGARE CHETAN ATUL", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "31", enrollmentNo: "24310250232", name: "PATIL SHRAVANI LUMAKAR", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "32", enrollmentNo: "24310250233", name: "MISHRA NIDHI VISHUPRASHAD", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "33", enrollmentNo: "24310250234", name: "HINGWE SHWETA AJAB", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "34", enrollmentNo: "24310250236", name: "BAKALE SANIKA PRADIP", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "35", enrollmentNo: "24310250237", name: "CHANPURE PRAFUL DIPAKRAO", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "36", enrollmentNo: "24310250238", name: "TUMSARE SALONI HEMRAJ", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "37", enrollmentNo: "24310250239", name: "PATIL SAUMYA PRAVIN", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "38", enrollmentNo: "24310250240", name: "NERKAR PRERNA SAMIR", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "39", enrollmentNo: "24310250241", name: "WANKHADE HIMANSHU AVINASH", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "40", enrollmentNo: "24310250243", name: "MAHORE ARYAN MOHAN", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "41", enrollmentNo: "24310250244", name: "DEVGHARE SWARUPA RAM", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "42", enrollmentNo: "24310250245", name: "DONGRE NAMAN SUNIL", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "43", enrollmentNo: "24310250246", name: "KADAM OMKAR GOVINDRAO", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "44", enrollmentNo: "24310250247", name: "PIMPLE TUSHAR TUKARAM", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "45", enrollmentNo: "24310250248", name: "BODHALE MANTHAN MAHADEV", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "46", enrollmentNo: "24310250249", name: "SHIRPURKAR VEDASHREE PRASHANT", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "47", enrollmentNo: "24310250250", name: "KALPANDE TANAYA DILIP", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "48", enrollmentNo: "24310250251", name: "NIGHOT SHRAVANI NANDKISHOR", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "49", enrollmentNo: "24310250252", name: "AJMIRE SIMRAN HEMANT", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "50", enrollmentNo: "24310250253", name: "KALE RUSHALI SANDIP", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "51", enrollmentNo: "24310250254", name: "DHAWALE VAISHANAVI BALAJI", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "52", enrollmentNo: "24310250255", name: "KATAKPURE NISHA RAJENDRA", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "53", enrollmentNo: "24310250256", name: "KSHIRSAGAR PAYAL DIPAK", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "54", enrollmentNo: "24310250257", name: "JASUTKAR TEJASWINI MOHAN", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "55", enrollmentNo: "24310250258", name: "JUMORE KRISH SUMEDH", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "56", enrollmentNo: "24310250259", name: "ZADE SANSKRUTI SANJAY", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "57", enrollmentNo: "24310250260", name: "BARDE ARYA PRAKASH", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "58", enrollmentNo: "24310250261", name: "MOKASHI CHERITA ARVIND", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "59", enrollmentNo: "24310250262", name: "KANGALE UMA PANDHARI", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "60", enrollmentNo: "24310250263", name: "MANOHARE SHRUTI UMESH", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "61", enrollmentNo: "24310250264", name: "KHAIRE AKANKSHA PRAMOD", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "62", enrollmentNo: "24310250265", name: "KUYATE ANIKET GANGADHAR", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "63", enrollmentNo: "24310250271", name: "KHALOKARTANVI MOHAN", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "64", enrollmentNo: "24310250427", name: "LONKAR SAKSHI KAMLAKAR", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "65", enrollmentNo: "24310250301", name: "ADHAU ANIKET NIRANJAN", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "66", enrollmentNo: "24310250302", name: "ECHORE SIDDHESH MANOJ", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "67", enrollmentNo: "24310250303", name: "SAWNERKAR DNYANESHWAR AJAY", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "68", enrollmentNo: "24310250304", name: "SHIVAM BHANGE", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "69", enrollmentNo: "24310250305", name: "NAGPURE PRANJALI SHALIKRAO", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "70", enrollmentNo: "24310250306", name: "NEVHAL VAIBHAV BHARAT", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 },
      { id: "71", enrollmentNo: "24310250307", name: "BORULE GAURI VISHAL", subjects: this.generateSampleMarks(), attendance: Math.floor(Math.random() * 20) + 80 }
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