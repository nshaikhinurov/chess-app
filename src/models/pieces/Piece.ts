import { Colors } from "../Colors";
import image from "../assets/bb.png";
import { Cell } from "../Cell";

export enum Pieces {
  PAWN = "pawn",
  KNIGHT = "knight",
  BISHOP = "bishop",
  ROOK = "rook",
  QUEEN = "queen",
  KING = "king",
}

export class Piece {
  id: number;
  color: Colors;
  image: typeof image | null;
  cell: Cell;
  name: Pieces;

  constructor(color: Colors, cell: Cell) {
    this.id = Math.random();
    this.color = color;
    this.cell = cell;
    this.cell.piece = this;

    this.image = null;
    this.name = Pieces.PAWN;
  }

  canMoveTo(target: Cell): boolean {
    if (target.piece?.color === this.color) {
      return false;
    }
    if (target.piece?.name === Pieces.KING) {
      return false;
    }
    return true;
  }

  moveTo(target: Cell) {}
}
