import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, User, Bot, Sparkles } from "lucide-react";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  message: string;
  timestamp: Date;
}

const mockResponses = {
  attendance: "Based on the latest data from Government Polytechnic Arvi (CO-3-K), here are some attendance rates:\n• BOKEY HIMANSHU SURENDRA: 95%\n• MRUNAL PRAVIN JAGTAP: 88%\n• UKANDE JAYANT MANGLESH: 97%\n\nReal-time data is synced from Google Sheets every 30 seconds.",
  marks: "Here are the latest sessional marks from Government Polytechnic Arvi:\n\n**Mathematics:**\n• BOKEY HIMANSHU: 85/100 (Grade A)\n• MRUNAL PRAVIN: 76/100 (Grade B+)\n• UKANDE JAYANT: 94/100 (Grade A+)\n\n**Physics:**\n• BOKEY HIMANSHU: 78/100 (Grade B+)\n• MRUNAL PRAVIN: 82/100 (Grade A-)\n• UKANDE JAYANT: 89/100 (Grade A)\n\nData updates automatically from Google Sheets.",
  syllabus: "I found the course syllabus document for Computer Science CO-3-K. It was last updated 2 hours ago and contains the complete curriculum for Academic Year 2025-26. Would you like me to open it for you?",
  sheets: "The website is connected to Google Sheets with real-time data synchronization. Student marks, attendance, and information are automatically updated every 30 seconds from your spreadsheet. The last sync was successful.",
  default: "I can help you with information about Government Polytechnic Arvi (CO-3-K):\n• 📊 Student marks and grades (Real-time from Google Sheets)\n• 📅 Attendance records\n• 📁 Course documents and syllabus\n• 📈 Performance analytics\n• 🔄 Google Sheets integration status\n\nWhat would you like to know?"
};

const getResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("attendance")) return mockResponses.attendance;
  if (lowerMessage.includes("marks") || lowerMessage.includes("grade")) return mockResponses.marks;
  if (lowerMessage.includes("syllabus") || lowerMessage.includes("pdf")) return mockResponses.syllabus;
  if (lowerMessage.includes("sheet") || lowerMessage.includes("sync") || lowerMessage.includes("connection")) return mockResponses.sheets;
  
  return mockResponses.default;
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      message: "Hello! I'm your Academic Assistant. I can help you access real-time information about student marks, attendance, and course materials. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: getResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="bg-card border-border shadow-card h-[600px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          Academic Assistant
          <Badge className="bg-primary/20 text-primary border-primary/30">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.type === "bot" && (
                  <div className="p-2 rounded-full bg-primary/10 shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  msg.type === "user" 
                    ? "bg-primary text-primary-foreground ml-12" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  <p className="text-sm whitespace-pre-line">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                
                {msg.type === "user" && (
                  <div className="p-2 rounded-full bg-muted shrink-0">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="p-2 rounded-full bg-primary/10 shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted text-muted-foreground rounded-lg px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about marks, attendance, documents..."
            className="flex-1 bg-input border-border"
          />
          <Button 
            onClick={sendMessage} 
            disabled={!inputMessage.trim() || isTyping}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-academic"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;