import { Square } from "../Square";
import { Color } from "../Color";
import { Piece, PieceName } from "./Piece";
import blackPawn from "src/assets/images/bp.png";
import whitePawn from "src/assets/images/wp.png";
import { Player } from "../Player";

export class Pawn extends Piece {
  moved: boolean = false;

  constructor(color: Color, square: Square, player: Player) {
    super(color, square, player);
    this.name = PieceName.PAWN;
    this.value = 1;
    this.image = this.color === Color.WHITE ? whitePawn : blackPawn;
  }

  canMoveTo(target: Square): boolean {
    if (!super.canMoveTo(target)) {
      return false;
    }

    const forwardStep = this.color === Color.BLACK ? 1 : -1;
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
    const board = this.square.board;
    const enPassantSquare = board.enPassantSquare;
    board.enPassantSquare = null;
    this.square.piece = null;

    const advancedTwoSquares = Math.abs(target.y - this.square.y) === 2;
    if (advancedTwoSquares) {
      board.enPassantSquare = board.getSquare(
        this.square.x,
        target.y + (this.color === Color.BLACK ? -1 : 1)
      );
    }

    if (target === enPassantSquare) {
      const capturedPawnSquare = board.getSquare(target.x, this.square.y);

      if (capturedPawnSquare.piece?.name !== PieceName.PAWN) {
        throw new Error("uexpected error: pawn not present");
      }

      capturedPawnSquare.piece.player.addLostPiece(capturedPawnSquare.piece);
      capturedPawnSquare.piece = null;
    }

    if (target.piece) {
      target.piece.player.addLostPiece(target.piece);
    }
    target.setPiece(this);
    this.moved = true;
  }
}
