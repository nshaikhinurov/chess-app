import { Square } from "../Square";
import { Color } from "../Color";
import { Piece, PieceName } from "./Piece";
import blackKnight from "src/assets/images/bn.png";
import whiteKnight from "src/assets/images/wn.png";

export class Knight extends Piece {
  constructor(color: Color, square: Square) {
    super(color, square);
    this.name = PieceName.KNIGHT;
    this.value = 3;
    this.image = this.color === Color.WHITE ? whiteKnight : blackKnight;
  }

  canMoveTo(target: Square): boolean {
    if (!super.canMoveTo(target)) {
      return false;
    }

    const xDiff = Math.abs(this.square.x - target.x);
    const yDiff = Math.abs(this.square.y - target.y);

    return (xDiff === 1 && yDiff === 2) || (yDiff === 1 && xDiff === 2);
  }
}
