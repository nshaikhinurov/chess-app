import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Piece, Pieces } from "./Piece";
import blackBishop from "../../assets/images/bb.png";
import whiteBishop from "../../assets/images/wb.png";

export class Bishop extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = Pieces.BISHOP;
    this.image = this.color === Colors.WHITE ? whiteBishop : blackBishop;
  }

  canMoveTo(target: Cell): boolean {
    if (!super.canMoveTo(target)) {
      return false;
    }

    return true;
  }
}
