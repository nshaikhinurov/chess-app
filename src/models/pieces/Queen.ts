import { Square } from "../Square";
import { Color } from "../Color";
import { Piece, PieceName } from "./Piece";
import blackQueen from "src/assets/images/bq.png";
import whiteQueen from "src/assets/images/wq.png";

export class Queen extends Piece {
  constructor(color: Color, square: Square) {
    super(color, square);
    this.name = PieceName.QUEEN;
    this.value = 9;
    this.image = this.color === Color.WHITE ? whiteQueen : blackQueen;
  }

  canMoveTo(target: Square): boolean {
    if (!super.canMoveTo(target)) {
      return false;
    }

    if (this.square.isVerticalPathEmpty(target)) {
      return true;
    }

    if (this.square.isHorizontalPathEmpty(target)) {
      return true;
    }

    if (this.square.isDiagonalPathEmpty(target)) {
      return true;
    }

    return false;
  }
}
