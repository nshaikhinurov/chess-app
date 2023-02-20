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
  value: number;

  constructor(color: Colors, square: Square) {
    this.id = Math.random();
    this.color = color;
    this.square = square;
    this.square.piece = this;
    this.value = 0;

    this.image = null;
    this.name = Pieces.PAWN;
  }

  canMoveTo(target: Square): boolean {
    if (target === this.square) {
      return false;
    }
    if (target.piece?.color === this.color) {
      return false;
    }
    if (target.piece?.name === Pieces.KING) {
      return false;
    }
    return true;
  }

  moveTo(target: Square) {
    this.square.board.enPassantSquare = null;
    this.square.piece = null;
    if (target.piece) {
      target.piece.square.board.addLostPiece(target.piece);
    }
    target.setPiece(this);
  }
}
