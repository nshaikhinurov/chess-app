import { Square } from "../Square";
import { Color } from "../Color";
import { Piece, PieceName } from "./Piece";
import blackRook from "../../assets/images/large/br.png";
import whiteRook from "../../assets/images/large/wr.png";

export class Rook extends Piece {
  constructor(color: Color, square: Square) {
    super(color, square);
    this.name = PieceName.ROOK;
    this.value = 5;
    this.image = this.color === Color.WHITE ? whiteRook : blackRook;
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

    return false;
  }
}
