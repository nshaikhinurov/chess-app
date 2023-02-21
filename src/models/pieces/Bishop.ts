import { Square } from "../Square";
import { Color } from "../Color";
import { Piece, PieceName } from "./Piece";
import blackBishop from "../../assets/images/large/bb.png";
import whiteBishop from "../../assets/images/large/wb.png";

export class Bishop extends Piece {
  constructor(color: Color, square: Square) {
    super(color, square);
    this.name = PieceName.BISHOP;
    this.value = 3;
    this.image = this.color === Color.WHITE ? whiteBishop : blackBishop;
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
