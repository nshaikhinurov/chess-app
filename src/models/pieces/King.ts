import { Square } from "../Square";
import { Colors } from "../Colors";
import { Piece, Pieces } from "./Piece";
import blackKing from "../../assets/images/bk.png";
import whiteKing from "../../assets/images/wk.png";

export class King extends Piece {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.name = Pieces.KING;
    this.image = this.color === Colors.WHITE ? whiteKing : blackKing;
  }

  canMoveTo(target: Square): boolean {
    if (!super.canMoveTo(target)) {
      return false;
    }

    return true;
  }
}
