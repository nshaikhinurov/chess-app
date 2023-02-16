/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752

import React from "react";
import { useEffect } from "react";
import { squareSize } from "../consts";
import { Board } from "../models/Board";
import { Square } from "../models/Square";
import SquareComponent from "./SquareComponent";

interface BoardComponentProps {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
}

const BoardComponent: React.FC<BoardComponentProps> = ({ board, setBoard }) => {
  const [selectedSquare, setSelectedSquare] = React.useState<null | Square>(
    null
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(highlightAvailableSquares, [selectedSquare]);

  function handleSquareClick(square: Square) {
    if (!selectedSquare) {
      setSelectedSquare(square);
      return;
    }

    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }

    if (selectedSquare !== square && selectedSquare.piece?.canMoveTo(square)) {
      selectedSquare.movePiece(square);
      setSelectedSquare(null);
      updateBoard();
    }
  }

  function highlightAvailableSquares() {
    board.highlightAvailableSquares(selectedSquare);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopy();
    setBoard(newBoard);
  }

  return (
    <div css={boardStyles}>
      {board.squares.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((square, index) => (
            <SquareComponent
              key={square.id}
              square={square}
              selected={selectedSquare?.id === square.id}
              onClick={handleSquareClick}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;

const boardStyles = {
  display: "flex",
  flexWrap: "wrap",
  width: `${8 * squareSize}px`,
  height: `${8 * squareSize}px`,
  borderRadius: "3px",
  overflow: "hidden",
} as const;
