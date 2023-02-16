import { Square } from "../Square";
import { Colors } from "../Colors";
import { Piece, Pieces } from "./Piece";
import blackKnight from "../../assets/images/bn.png";
import whiteKnight from "../../assets/images/wn.png";

export class Knight extends Piece {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.name = Pieces.KNIGHT;
    this.image = this.color === Colors.WHITE ? whiteKnight : blackKnight;
  }

  canMoveTo(target: Square): boolean {
    if (!super.canMoveTo(target)) {
      return false;
    }

    return true;
  }
}
