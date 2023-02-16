import { Board } from "./Board";
import { Colors } from "./Colors";
import { Piece } from "./pieces/Piece";

export class Cell {
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

  movePiece(targetCell: Cell) {
    if (this.piece && this.piece.canMoveTo(targetCell)) {
      this.piece.moveTo(targetCell);
      targetCell.piece = this.piece;
      this.piece = null;
    }
  }
}
