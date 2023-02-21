import { Square } from "../Square";
import { Color } from "../Color";
import { Piece, PieceName } from "./Piece";
import blackKing from "../../assets/images/large/bk.png";
import whiteKing from "../../assets/images/large/wk.png";

export class King extends Piece {
  constructor(color: Color, square: Square) {
    super(color, square);
    this.name = PieceName.KING;
    this.image = this.color === Color.WHITE ? whiteKing : blackKing;
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
