import { Square } from "../Square";
import { Colors } from "../Colors";
import { Piece, Pieces } from "./Piece";
import blackPawn from "../../assets/images/bp.png";
import whitePawn from "../../assets/images/wp.png";

export class Pawn extends Piece {
  moved: boolean = false;

  constructor(color: Colors, square: Square) {
    super(color, square);
    this.name = Pieces.PAWN;
    this.image = this.color === Colors.WHITE ? whitePawn : blackPawn;
  }

  canMoveTo(target: Square): boolean {
    if (!super.canMoveTo(target)) {
      return false;
    }

    const forwardStep = this.color === Colors.BLACK ? 1 : -1;
    const isAvailableToAdvanceTo = (target: Square): boolean => {
      return (
        target.isEmpty() &&
        target.x === this.square.x && // same file
        (target.y === this.square.y + forwardStep || // one square forward
          (!this.moved && // or two squares forward
            target.y === this.square.y + 2 * forwardStep &&
            this.square.board
              .getSquare(this.square.x, this.square.y + forwardStep)
              .isEmpty()))
      );
    };

    const isAvailableToCaptureDiagonally = (target: Square): boolean => {
      return (
        target.y === this.square.y + forwardStep &&
        Math.abs(target.x - this.square.x) === 1 &&
        (!target.isEmpty() || target === target.board.enPassantSquare)
      );
    };

    return (
      isAvailableToAdvanceTo(target) || isAvailableToCaptureDiagonally(target)
    );
  }

  moveTo(target: Square): void {
    const enPassantSquare = this.square.board.enPassantSquare;
    this.square.board.enPassantSquare = null;
    this.square.piece = null;

    const advancedTwoSquares = Math.abs(target.y - this.square.y) === 2;
    if (advancedTwoSquares) {
      this.square.board.enPassantSquare = this.square.board.getSquare(
        this.square.x,
        target.y + (this.color === Colors.BLACK ? -1 : 1)
      );
    }

    if (target === enPassantSquare) {
      const capturedPawnSquare = this.square.board.getSquare(
        target.x,
        this.square.y
      );
      capturedPawnSquare.piece = null;
    }

    target.setPiece(this);
    this.moved = true;
  }
}
