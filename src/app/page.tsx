"use client";

import { Chessboard } from "@/components/Chessboard";
import { PlayerProfile } from "@/components/PlayerProfile";
import { MoveHistory } from "@/components/MoveHistory";
import { Chat } from "@/components/Chat";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";

export default function ChessGame() {
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');

  // Sample player data
  const whitePlayer = {
    name: "You",
    rating: 1842,
    timeLeft: 600, // 10 minutes
    isActive: currentPlayer === 'white',
    color: 'white' as const
  };

  const blackPlayer = {
    name: "Magnus",
    rating: 2847,
    timeLeft: 580, // 9 minutes 40 seconds
    isActive: currentPlayer === 'black',
    color: 'black' as const
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Modern Chess
              </h1>
              <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
                Rapid • 10+0
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Game Layout */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          
          {/* Left Sidebar - Player Profiles and Move History */}
          <div className="lg:col-span-1 space-y-4">
            {/* Black Player (Top) */}
            <PlayerProfile
              {...blackPlayer}
              avatar="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b028a22c-dd99-4214-a193-6ad652528cc2.png"
            />
            
            {/* Move History */}
            <div className="hidden lg:block">
              <MoveHistory moves={[]} />
            </div>
          </div>

          {/* Center - Chessboard */}
          <div className="lg:col-span-2">
            <div className="flex justify-center">
              <Chessboard />
            </div>
            
            {/* Mobile Move History */}
            <div className="lg:hidden mt-6">
              <MoveHistory moves={[]} />
            </div>
          </div>

          {/* Right Sidebar - White Player and Chat */}
          <div className="lg:col-span-1 space-y-4">
            {/* White Player (Bottom) */}
            <PlayerProfile
              {...whitePlayer}
              avatar="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c5fb0995-bbd0-4ef5-9ed6-db2b5bb16baa.png"
            />
            
            {/* Chat */}
            <div className="hidden lg:block">
              <Chat playerName={whitePlayer.name} />
            </div>
          </div>
        </div>

        {/* Mobile Chat */}
        <div className="lg:hidden mt-6">
          <Chat playerName={whitePlayer.name} />
        </div>

        {/* Game Controls */}
        <div className="mt-8 flex justify-center space-x-4">
          <button 
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            onClick={() => {/* Handle resign */}}
          >
            Resign
          </button>
          <button 
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            onClick={() => {/* Handle draw offer */}}
          >
            Offer Draw
          </button>
          <button 
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            onClick={() => setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white')}
          >
            Switch Turn
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Modern Chess Game Interface • Built with Next.js & Tailwind CSS
        </div>
      </footer>
    </div>
  );
}