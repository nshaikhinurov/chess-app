import { Colors } from "../Colors";
import image from "../assets/bb.png";
import { Square } from "../Square";

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
  square: Square;
  name: Pieces;

  constructor(color: Colors, square: Square) {
    this.id = Math.random();
    this.color = color;
    this.square = square;
    this.square.piece = this;

    this.image = null;
    this.name = Pieces.PAWN;
  }

  canMoveTo(target: Square): boolean {
    if (target.piece?.color === this.color) {
      return false;
    }
    if (target.piece?.name === Pieces.KING) {
      return false;
    }
    return true;
  }

  moveTo(target: Square) {}
}
