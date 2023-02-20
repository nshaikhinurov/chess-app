import { Square } from "../Square";
import { Colors } from "../Colors";
import { Piece, Pieces } from "./Piece";
import blackBishop from "../../assets/images/large/bb.png";
import whiteBishop from "../../assets/images/large/wb.png";

export class Bishop extends Piece {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.name = Pieces.BISHOP;
    this.value = 3;
    this.image = this.color === Colors.WHITE ? whiteBishop : blackBishop;
  }

  canMoveTo(target: Square): boolean {
    if (!super.canMoveTo(target)) {
      return false;
    }

    if (this.square.isDiagonalPathEmpty(target)) {
      return true;
    }

    return false;
  }
}
