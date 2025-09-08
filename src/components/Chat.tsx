"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  timestamp: Date;
  isOwn: boolean;
}

interface ChatProps {
  playerName?: string;
}

export function Chat({ playerName = "You" }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "Magnus",
      message: "Good luck! 🎯",
      timestamp: new Date(Date.now() - 120000),
      isOwn: false
    },
    {
      id: 2,
      sender: playerName,
      message: "Thanks! Good game!",
      timestamp: new Date(Date.now() - 60000),
      isOwn: true
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: messages.length + 1,
      sender: playerName,
      message: newMessage.trim(),
      timestamp: new Date(),
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Chat</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 h-[300px] px-4">
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-2 ${
                    msg.isOwn
                      ? 'bg-blue-500 text-white ml-auto'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <div className="text-xs opacity-75 mb-1">
                    {msg.sender} • {formatTime(msg.timestamp)}
                  </div>
                  <div className="text-sm">{msg.message}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
              maxLength={200}
            />
            <Button type="submit" size="sm" className="px-3">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Be respectful and follow fair play rules
          </div>
        </div>
      </CardContent>
    </Card>
  );
}