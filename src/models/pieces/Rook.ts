import { Square } from "../Square";
import { Colors } from "../Colors";
import { Piece, Pieces } from "./Piece";
import blackRook from "../../assets/images/br.png";
import whiteRook from "../../assets/images/wr.png";

export class Rook extends Piece {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.name = Pieces.ROOK;
    this.image = this.color === Colors.WHITE ? whiteRook : blackRook;
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
