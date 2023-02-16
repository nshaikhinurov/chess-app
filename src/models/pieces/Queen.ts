import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Piece, Pieces } from "./Piece";
import blackQueen from "../../assets/images/bq.png";
import whiteQueen from "../../assets/images/wq.png";

export class Queen extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = Pieces.QUEEN;
    this.image = this.color === Colors.WHITE ? whiteQueen : blackQueen;
  }
}
