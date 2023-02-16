import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Piece, Pieces } from "./Piece";
import blackRook from "../../assets/images/br.png";
import whiteRook from "../../assets/images/wr.png";

export class Rook extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = Pieces.ROOK;
    this.image = this.color === Colors.WHITE ? whiteRook : blackRook;
  }
}
