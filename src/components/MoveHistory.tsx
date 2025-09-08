"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Move {
  moveNumber: number;
  white: string;
  black?: string;
}

interface MoveHistoryProps {
  moves: Move[];
  currentMoveIndex?: number;
}

export function MoveHistory({ moves, currentMoveIndex = -1 }: MoveHistoryProps) {
  // Sample moves for demonstration
  const sampleMoves: Move[] = moves.length > 0 ? moves : [
    { moveNumber: 1, white: "e4", black: "e5" },
    { moveNumber: 2, white: "Nf3", black: "Nc6" },
    { moveNumber: 3, white: "Bb5", black: "a6" },
    { moveNumber: 4, white: "Ba4", black: "Nf6" },
    { moveNumber: 5, white: "O-O", black: "Be7" },
    { moveNumber: 6, white: "Re1", black: "b5" },
    { moveNumber: 7, white: "Bb3", black: "d6" },
    { moveNumber: 8, white: "c3", black: "O-O" },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Move History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-4">
          <div className="space-y-1">
            {sampleMoves.map((move, index) => (
              <div 
                key={move.moveNumber} 
                className="grid grid-cols-[auto_1fr_1fr] gap-2 py-2 px-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
              >
                <span className="text-gray-500 dark:text-gray-400 font-mono min-w-[2rem]">
                  {move.moveNumber}.
                </span>
                <button 
                  className={`text-left font-mono hover:bg-blue-100 dark:hover:bg-blue-900 px-1 rounded ${
                    currentMoveIndex === index * 2 ? 'bg-blue-200 dark:bg-blue-800' : ''
                  }`}
                  onClick={() => {/* Handle move navigation */}}
                >
                  {move.white}
                </button>
                {move.black && (
                  <button 
                    className={`text-left font-mono hover:bg-blue-100 dark:hover:bg-blue-900 px-1 rounded ${
                      currentMoveIndex === index * 2 + 1 ? 'bg-blue-200 dark:bg-blue-800' : ''
                    }`}
                    onClick={() => {/* Handle move navigation */}}
                  >
                    {move.black}
                  </button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {/* Game result placeholder */}
        <div className="p-4 border-t">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Game in progress...
          </div>
        </div>
      </CardContent>
    </Card>
  );
}