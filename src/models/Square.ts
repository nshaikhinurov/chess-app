import { Board } from "./Board";
import { Colors } from "./Colors";
import { Piece } from "./pieces/Piece";
import * as R from "ramda";
export class Square {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  board: Board;
  id: number;
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
    color: Colors;
    piece: Piece | null;
  }) {
    this.board = board;
    this.id = Math.random();
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

    return true;
  }

  setPiece(piece: Piece) {
    this.piece = piece;
    this.piece.square = this;
  }

  movePiece(targetSquare: Square) {
    if (this.piece && this.piece.canMoveTo(targetSquare)) {
      this.piece.moveTo(targetSquare);
      targetSquare.setPiece(this.piece);
      this.piece = null;
    }
  }
}
