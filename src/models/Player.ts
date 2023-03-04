import { Color } from "./Color";
import { Piece } from "./pieces/Piece";

export class Player {
  id: number;
  color: Color;
  lostPieces: Piece[] = [];

  constructor(color: Color) {
    this.id = Math.random();
    this.color = color;
  }

  addLostPiece(piece: Piece) {
    this.lostPieces.push(piece);
  }
}
