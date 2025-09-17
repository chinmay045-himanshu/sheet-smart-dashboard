import { useState, useEffect } from 'react';
import { googleSheetsService, StudentData } from '@/services/googleSheets';
import { useToast } from '@/hooks/use-toast';

export const useGoogleSheets = (autoRefresh = true, refreshInterval = 30000) => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  const fetchData = async (showToast = false) => {
    try {
      setLoading(true);
      setError(null);
      const data = await googleSheetsService.fetchStudentData();
      setStudents(data);
      setLastUpdated(new Date());
      
      if (showToast) {
        toast({
          title: "Data Updated",
          description: "Student data has been refreshed from Google Sheets",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => fetchData(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  return {
    students,
    loading,
    error,
    lastUpdated,
    refresh,
    isApiKeyConfigured: googleSheetsService.isApiKeyConfigured()
  };
};