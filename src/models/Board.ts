import { Square } from "./Square";
import { Colors } from "./Colors";
import { Bishop } from "./pieces/Bishop";
import { King } from "./pieces/King";
import { Knight } from "./pieces/Knight";
import { Pawn } from "./pieces/Pawn";
import { Queen } from "./pieces/Queen";
import { Rook } from "./pieces/Rook";
import * as R from "ramda";
export class Board {
  squares: Square[][] = [];
  enPassantSquare: Square | null = null;

  public initSquares() {
    this.squares = R.times(
      (row) =>
        R.times(
          (col) =>
            new Square({
              board: this,
              x: col,
              y: row,
              color: (row + col) % 2 === 0 ? Colors.WHITE : Colors.BLACK,
              piece: null,
            }),
          8
        ),
      8
    );
  }

  public getSquare(x: number, y: number): Square {
    return this.squares[y][x];
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.WHITE, this.getSquare(i, 6));
      new Pawn(Colors.BLACK, this.getSquare(i, 1));
    }
  }

  private addKnights() {
    new Knight(Colors.WHITE, this.getSquare(1, 7));
    new Knight(Colors.WHITE, this.getSquare(6, 7));
    new Knight(Colors.BLACK, this.getSquare(6, 0));
    new Knight(Colors.BLACK, this.getSquare(1, 0));
  }

  private addBishops() {
    new Bishop(Colors.WHITE, this.getSquare(2, 7));
    new Bishop(Colors.WHITE, this.getSquare(5, 7));
    new Bishop(Colors.BLACK, this.getSquare(5, 0));
    new Bishop(Colors.BLACK, this.getSquare(2, 0));
  }

  private addRooks() {
    new Rook(Colors.WHITE, this.getSquare(0, 7));
    new Rook(Colors.WHITE, this.getSquare(7, 7));
    new Rook(Colors.BLACK, this.getSquare(7, 0));
    new Rook(Colors.BLACK, this.getSquare(0, 0));
  }

  private addQueens() {
    new Queen(Colors.WHITE, this.getSquare(3, 7));
    new Queen(Colors.BLACK, this.getSquare(3, 0));
  }

  private addKings() {
    new King(Colors.WHITE, this.getSquare(4, 7));
    new King(Colors.BLACK, this.getSquare(4, 0));
  }

  public placePieces() {
    this.addPawns();
    this.addKnights();
    this.addBishops();
    this.addRooks();
    this.addQueens();
    this.addKings();
  }

  public highlightAvailableSquares(selectedSquare: Square | null) {
    this.squares.flat().forEach((targetSquare) => {
      targetSquare.available = Boolean(
        selectedSquare?.piece?.canMoveTo(targetSquare)
      );
    });
  }

  public getCopy(): Board {
    const newBoard = new Board();
    newBoard.squares = this.squares;
    newBoard.enPassantSquare = this.enPassantSquare;
    return newBoard;
  }
}
