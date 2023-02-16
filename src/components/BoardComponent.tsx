/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752

import React from "react";
import { useEffect } from "react";
import { cellSize } from "../consts";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import CellComponent from "./CellComponent";

interface BoardComponentProps {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
}

const BoardComponent: React.FC<BoardComponentProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = React.useState<null | Cell>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(highlightAvailableCells, [selectedCell]);

  function handleCellClick(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.piece?.canMoveTo(cell)
    ) {
      selectedCell.movePiece(cell);
      setSelectedCell(null);
      updateBoard();
    } else {
      setSelectedCell(cell);
    }
  }

  function highlightAvailableCells() {
    board.highlightAvailableCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopy();
    setBoard(newBoard);
  }

  return (
    <div css={boardStyles}>
      {board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((cell, index) => (
            <CellComponent
              key={cell.id}
              cell={cell}
              selected={selectedCell?.id === cell.id}
              onClick={handleCellClick}
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
  width: `${8 * cellSize}px`,
  height: `${8 * cellSize}px`,
  borderRadius: "3px",
  overflow: "hidden",
} as const;
