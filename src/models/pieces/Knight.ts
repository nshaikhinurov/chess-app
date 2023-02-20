import { Square } from "../Square";
import { Colors } from "../Colors";
import { Piece, Pieces } from "./Piece";
import blackKnight from "../../assets/images/large/bn.png";
import whiteKnight from "../../assets/images/large/wn.png";

export class Knight extends Piece {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.name = Pieces.KNIGHT;
    this.value = 3;
    this.image = this.color === Colors.WHITE ? whiteKnight : blackKnight;
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
