import { Square } from "../Square";
import { Color } from "../Color";
import { Piece, PieceName } from "./Piece";
import blackKing from "src/assets/images/bk.png";
import whiteKing from "src/assets/images/wk.png";
import { Player } from "../Player";

export class King extends Piece {
  constructor(color: Color, square: Square, player: Player) {
    super(color, square, player);
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
