import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Piece, Pieces } from "./Piece";
import blackPawn from "../../assets/images/bp.png";
import whitePawn from "../../assets/images/wp.png";

export class Pawn extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = Pieces.PAWN;
    this.image = this.color === Colors.WHITE ? whitePawn : blackPawn;
  }
}
