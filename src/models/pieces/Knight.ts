import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Piece, Pieces } from "./Piece";
import blackKnight from "../../assets/images/bn.png";
import whiteKnight from "../../assets/images/wn.png";

export class Knight extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = Pieces.KNIGHT;
    this.image = this.color === Colors.WHITE ? whiteKnight : blackKnight;
  }
}
