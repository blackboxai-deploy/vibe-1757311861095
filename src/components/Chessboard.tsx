"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

// Chess piece Unicode symbols
const PIECES = {
  // White pieces
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  // Black pieces
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
};

// Initial chess board position (FEN notation simplified)
const INITIAL_POSITION = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

type Position = {
  row: number;
  col: number;
};

export function Chessboard() {
  const [board, setBoard] = useState(INITIAL_POSITION);
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [lastMove, setLastMove] = useState<{from: Position, to: Position} | null>(null);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const handleSquareClick = (row: number, col: number) => {
    const newPosition = { row, col };
    
    if (selectedSquare) {
      // Move piece (simplified - no validation for this mockup)
      if (selectedSquare.row !== row || selectedSquare.col !== col) {
        const newBoard = [...board];
        const piece = newBoard[selectedSquare.row][selectedSquare.col];
        newBoard[newPosition.row][newPosition.col] = piece;
        newBoard[selectedSquare.row][selectedSquare.col] = '';
        setBoard(newBoard);
        setLastMove({ from: selectedSquare, to: newPosition });
      }
      setSelectedSquare(null);
    } else {
      // Select piece
      if (board[row][col]) {
        setSelectedSquare(newPosition);
      }
    }
  };

  const isLightSquare = (row: number, col: number) => (row + col) % 2 === 0;
  const isSelected = (row: number, col: number) => 
    selectedSquare?.row === row && selectedSquare?.col === col;
  const isLastMoveSquare = (row: number, col: number) =>
    (lastMove?.from.row === row && lastMove?.from.col === col) ||
    (lastMove?.to.row === row && lastMove?.to.col === col);

  return (
    <Card className="p-6 bg-white dark:bg-gray-900">
      <div className="relative">
        {/* Board */}
        <div className="grid grid-cols-8 gap-0 border-2 border-gray-800 dark:border-gray-200 aspect-square max-w-[500px] mx-auto">
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  relative flex items-center justify-center text-4xl font-bold cursor-pointer
                  transition-all duration-150 hover:brightness-110
                  ${isLightSquare(rowIndex, colIndex) 
                    ? 'bg-amber-100 dark:bg-amber-200' 
                    : 'bg-amber-800 dark:bg-amber-900'
                  }
                  ${isSelected(rowIndex, colIndex) 
                    ? 'ring-4 ring-blue-500 ring-inset' 
                    : ''
                  }
                  ${isLastMoveSquare(rowIndex, colIndex)
                    ? 'bg-yellow-300 dark:bg-yellow-600'
                    : ''
                  }
                `}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {piece && (
                  <span className={`select-none ${piece === piece.toLowerCase() ? 'text-black' : 'text-white drop-shadow-sm'}`}>
                    {PIECES[piece as keyof typeof PIECES]}
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Rank labels (1-8) */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-around items-center -ml-6">
          {ranks.map(rank => (
            <div key={rank} className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {rank}
            </div>
          ))}
        </div>

        {/* File labels (a-h) */}
        <div className="absolute bottom-0 left-0 w-full flex justify-around items-center -mb-6">
          {files.map(file => (
            <div key={file} className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {file}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}