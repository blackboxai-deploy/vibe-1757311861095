"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface PlayerProfileProps {
  name: string;
  rating: number;
  timeLeft: number; // in seconds
  isActive: boolean;
  avatar?: string;
  color: 'white' | 'black';
}

export function PlayerProfile({ 
  name, 
  rating, 
  timeLeft, 
  isActive, 
  avatar,
  color 
}: PlayerProfileProps) {
  const [displayTime, setDisplayTime] = useState(timeLeft);

  useEffect(() => {
    setDisplayTime(timeLeft);
    
    if (!isActive) return;

    const interval = setInterval(() => {
      setDisplayTime(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (displayTime <= 30) return "text-red-600 dark:text-red-400";
    if (displayTime <= 60) return "text-orange-600 dark:text-orange-400";
    return "text-gray-900 dark:text-gray-100";
  };

  return (
    <Card className={`transition-all duration-200 ${
      isActive 
        ? 'ring-2 ring-blue-500 shadow-lg' 
        : 'opacity-75'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatar} />
            <AvatarFallback className={`text-white font-bold ${
              color === 'white' ? 'bg-gray-100 text-gray-900' : 'bg-gray-800 text-white'
            }`}>
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate text-gray-900 dark:text-gray-100">
                {name}
              </h3>
              <Badge variant={color === 'white' ? 'outline' : 'secondary'} className="text-xs">
                {color}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {rating}
              </span>
              
              <div className={`flex items-center gap-1 font-mono text-lg font-bold ${getTimerColor()}`}>
                <Clock className="h-4 w-4" />
                {formatTime(displayTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Active player indicator */}
        {isActive && (
          <div className="mt-3 flex items-center justify-center">
            <div className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium animate-pulse">
              Your Turn
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}