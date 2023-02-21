/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752import React from "react";

import { Color, Piece, PieceName } from "src/models";
import { blockHeight } from "src/consts";

interface CapturedPiecesProps {
  capturedPieces: Piece[];
  advantage: number;
}

const CapturedPieces: React.FC<CapturedPiecesProps> = ({
  capturedPieces,
  advantage,
}) => {
  return (
    <div css={capturedPiecesStyles}>
      {sortByValue(capturedPieces).map((piece) => (
        <div key={piece.id}>
          <i className={getCmClassName(piece)} aria-hidden="true"></i>
        </div>
      ))}

      {advantage > 0 && <div>+{advantage}</div>}
    </div>
  );
};

export default CapturedPieces;

const capturedPieceSize = 0.5 * blockHeight;
const capturedPiecesStyles = {
  height: capturedPieceSize,
  display: "flex",
  gap: 5,
  color: "#F7F7F7",
  "& .cm": {
    fontSize: capturedPieceSize,
    "&.pawn": {
      margin: "0 -0.2169em",
    },
    "&.knight": {
      margin: "0 -0.0851em",
    },
    "&.bishop": {
      margin: "0 -0.1023em",
    },
    "&.rook": {
      margin: "0 -0.1675em",
    },
    "&.queen": {
      margin: "0 -0.0492em",
    },
  },
} as const;

function sortByValue(pieces: Piece[]): Piece[] {
  return pieces.sort(
    (p1, p2) =>
      p1.value - p2.value ||
      // If the pieces have the same value, sort by name
      (p1.name === PieceName.KNIGHT ? -1 : 1)
  );
}

function getCmClassName(piece: Piece): string {
  return `cm cm-${piece.color === Color.WHITE ? "b" : "w"}-${piece.name} ${
    piece.name
  }`;
}
