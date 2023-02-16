import { Square } from "../Square";
import { Colors } from "../Colors";
import { Piece, Pieces } from "./Piece";
import blackPawn from "../../assets/images/bp.png";
import whitePawn from "../../assets/images/wp.png";

export class Pawn extends Piece {
  constructor(color: Colors, square: Square) {
    super(color, square);
    this.name = Pieces.PAWN;
    this.image = this.color === Colors.WHITE ? whitePawn : blackPawn;
  }

  canMoveTo(target: Square): boolean {
    if (!super.canMoveTo(target)) {
      return false;
    }

    return true;
  }
}
