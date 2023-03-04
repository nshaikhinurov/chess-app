import { Color } from "../Color";
import image from "../assets/bb.png";
import { Square } from "../Square";
import { Player } from "../Player";

export enum PieceName {
  PAWN = "pawn",
  KNIGHT = "knight",
  BISHOP = "bishop",
  ROOK = "rook",
  QUEEN = "queen",
  KING = "king",
}

export class Piece {
  id: number;
  color: Color;
  image: typeof image | null;
  square: Square;
  name: PieceName;
  value: number;
  player: Player;
  moved: boolean = false;

  constructor(color: Color, square: Square, player: Player) {
    this.id = Math.random();
    this.color = color;
    this.player = player;
    this.square = square;
    this.square.piece = this;
    this.value = 0;

    this.image = null;
    this.name = PieceName.PAWN;
  }

  canMoveTo(target: Square): boolean {
    if (target === this.square) {
      return false;
    }
    if (target.piece?.color === this.color) {
      return false;
    }
    if (target.piece?.name === PieceName.KING) {
      return false;
    }
    return true;
  }

  moveTo(target: Square) {
    this.square.board.enPassantSquare = null;
    this.square.piece = null;

    if (target.piece) {
      target.piece.player.addLostPiece(target.piece);
    }

    target.setPiece(this);
    this.moved = true;
  }
}
