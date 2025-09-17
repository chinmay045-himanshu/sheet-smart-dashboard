import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { googleSheetsService } from '@/services/googleSheets';
import { Key, ExternalLink } from 'lucide-react';

interface ApiKeySetupProps {
  onSetup: () => void;
}

const ApiKeySetup = ({ onSetup }: ApiKeySetupProps) => {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSetup = async () => {
    if (!apiKey.trim()) return;
    
    setLoading(true);
    await googleSheetsService.setupApiKey(apiKey);
    setLoading(false);
    onSetup();
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Google Sheets API Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            To connect your Google Sheets data in real-time, you need to set up a Google Sheets API key.
            This is a one-time setup process.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <Label htmlFor="apiKey">Google Sheets API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Google Sheets API key"
              className="mt-2"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleSetup} 
              disabled={!apiKey.trim() || loading}
              className="flex-1"
            >
              {loading ? 'Setting up...' : 'Connect Google Sheets'}
            </Button>
            <Button 
              variant="outline" 
              asChild
            >
              <a 
                href="https://console.cloud.google.com/apis/credentials" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Get API Key
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>Steps to get your API key:</strong></p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Go to Google Cloud Console</li>
            <li>Create a new project or select existing one</li>
            <li>Enable Google Sheets API</li>
            <li>Go to Credentials and create an API key</li>
            <li>Restrict the key to Google Sheets API for security</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeySetup;