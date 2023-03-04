import { Square } from "../Square";
import { Color } from "../Color";
import { Piece, PieceName } from "./Piece";
import blackRook from "src/assets/images/br.png";
import whiteRook from "src/assets/images/wr.png";
import { Player } from "../Player";

export class Rook extends Piece {
  constructor(color: Color, square: Square, player: Player) {
    super(color, square, player);

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
