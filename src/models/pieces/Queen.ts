import { Square } from "../Square";
import { Colors } from "../Colors";
import { Piece, Pieces } from "./Piece";
import blackQueen from "../../assets/images/bq.png";
import whiteQueen from "../../assets/images/wq.png";

export class Queen extends Piece {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.name = Pieces.QUEEN;
    this.image = this.color === Colors.WHITE ? whiteQueen : blackQueen;
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
