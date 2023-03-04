/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752

import React from "react";
import { useEffect } from "react";
import { squareSize } from "../consts";
import { Board } from "../models/Board";
import { Player } from "../models/Player";
import { Square } from "../models/Square";
import SquareComponent from "./SquareComponent";
import { borderRadius } from "../consts";
import { useBoard } from "src/contexts/BoardProvider";
interface BoardComponentProps {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  currentPlayer: Player | null;
  changeCurrentPlayer: () => void;
}

const BoardComponent: React.FC<BoardComponentProps> = ({
  currentPlayer,
  changeCurrentPlayer,
}) => {
  const { board, setBoard } = useBoard();
  const [selectedSquare, setSelectedSquare] = React.useState<null | Square>(
    null
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(highlightAvailableSquares, [selectedSquare]);

  function handleSquareClick(square: Square) {
    // Select piece
    if (!selectedSquare) {
      if (square.piece && square.piece.color === currentPlayer?.color) {
        setSelectedSquare(square);
      }
      return;
    }

    // Deselect
    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }

    // Select different piece
    if (
      square !== selectedSquare &&
      square.piece?.color === selectedSquare.piece?.color
    ) {
      setSelectedSquare(square);
      return;
    }

    // Move selected piece
    if (selectedSquare !== square && selectedSquare.piece?.canMoveTo(square)) {
      selectedSquare.piece.moveTo(square);
      setSelectedSquare(null);
      updateBoard();
      changeCurrentPlayer();
    }
  }

  function highlightAvailableSquares() {
    board.highlightAvailableSquares(selectedSquare);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.clone();
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
  borderRadius,
  overflow: "hidden",
} as const;
