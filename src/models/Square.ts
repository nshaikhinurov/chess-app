import { Board } from "./Board";
import { Color } from "./Color";
import { Piece } from "./pieces/Piece";
import * as R from "ramda";
export class Square {
  readonly x: number;
  readonly y: number;
  readonly color: Color;
  board: Board;
  id: string;
  piece: Piece | null;
  available: boolean;

  constructor({
    board,
    x,
    y,
    color,
    piece,
  }: {
    board: Board;
    x: number;
    y: number;
    color: Color;
    piece: Piece | null;
  }) {
    this.board = board;
    this.id = `${intToChar(x)}${8 - y}`;
    this.x = x;
    this.y = y;
    this.color = color;
    this.piece = piece;
    this.available = false;
  }

  isEmpty(): boolean {
    return this.piece === null;
  }

  isVerticalPathEmpty(targetSquare: Square): boolean {
    // Check if the target square is on the same file
    if (this.x !== targetSquare.x) {
      return false;
    }

    // Check if there are no pieces between the current square and the target square
    const start = Math.min(this.y, targetSquare.y);
    const end = Math.max(this.y, targetSquare.y);

    if (
      R.range(start + 1, end).some((y) => {
        const passableSquare = this.board.getSquare(this.x, y);
        return !passableSquare.isEmpty();
      })
    ) {
      return false;
    }

    return true;
  }

  isHorizontalPathEmpty(targetSquare: Square): boolean {
    // Check if the target square is on the same rank
    if (this.y !== targetSquare.y) {
      return false;
    }

    // Check if there are no pieces between the current square and the target square
    const start = Math.min(this.x, targetSquare.x);
    const end = Math.max(this.x, targetSquare.x);

    if (
      R.range(start + 1, end).some((x) => {
        const passableSquare = this.board.getSquare(x, this.y);
        return !passableSquare.isEmpty();
      })
    ) {
      return false;
    }

    return true;
  }

  isDiagonalPathEmpty(targetSquare: Square): boolean {
    const xDiff = Math.abs(this.x - targetSquare.x);
    const yDiff = Math.abs(this.y - targetSquare.y);

    // Check if the target square is on the same diagonal
    if (xDiff !== yDiff) {
      return false;
    }

    // Check if there are no pieces between the current square and the target square
    const dx = targetSquare.x > this.x ? 1 : -1;
    const dy = targetSquare.y > this.y ? 1 : -1;

    for (let i = 1; i < xDiff; i++) {
      if (!this.board.getSquare(this.x + i * dx, this.y + i * dy).isEmpty()) {
        return false;
      }
    }

    return true;
  }

  isAttackedBy(color: Color): boolean {
    const opponentPieces = this.board.getPieces(color);
    return opponentPieces.some((piece) => piece.canMoveTo(this));
  }

  setPiece(piece: Piece) {
    this.piece = piece;
    this.piece.square = this;
  }
}

function intToChar(int: number): string {
  const code = "a".charCodeAt(0);

  return String.fromCharCode(code + int);
}
