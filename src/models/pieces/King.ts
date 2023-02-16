import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Piece, Pieces } from "./Piece";
import blackKing from "../../assets/images/bk.png";
import whiteKing from "../../assets/images/wk.png";

export class King extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = Pieces.KING;
    this.image = this.color === Colors.WHITE ? whiteKing : blackKing;
  }
}
