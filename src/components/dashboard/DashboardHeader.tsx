import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Settings } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DashboardHeader = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Sessional Marks Dashboard
        </h1>
        <p className="text-muted-foreground">
          Real-time insights from Google Sheets integration
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-academic"
        >
          <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
          Refresh Data
        </Button>
        
        <Button variant="outline" className="border-border hover:bg-muted">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        
        <Button variant="outline" size="icon" className="border-border hover:bg-muted">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;