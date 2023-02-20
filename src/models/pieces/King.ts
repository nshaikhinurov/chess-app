import { Square } from "../Square";
import { Colors } from "../Colors";
import { Piece, Pieces } from "./Piece";
import blackKing from "../../assets/images/large/bk.png";
import whiteKing from "../../assets/images/large/wk.png";

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

    const xDiff = Math.abs(this.square.x - target.x);
    const yDiff = Math.abs(this.square.y - target.y);

    return xDiff <= 1 && yDiff <= 1;
  }
}
