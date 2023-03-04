import { Square } from "../Square";
import { Color } from "../Color";
import { Piece, PieceName } from "./Piece";
import blackBishop from "src/assets/images/bb.png";
import whiteBishop from "src/assets/images/wb.png";
import { Player } from "../Player";

export class Bishop extends Piece {
  constructor(color: Color, square: Square, player: Player) {
    super(color, square, player);

    this.name = PieceName.BISHOP;
    this.value = 3;
    this.image = this.color === Color.WHITE ? whiteBishop : blackBishop;
  }

  canMoveTo(target: Square): boolean {
    if (!super.canMoveTo(target)) {
      return false;
    }

    if (this.square.isDiagonalPathEmpty(target)) {
      return true;
    }

    return false;
  }
}
