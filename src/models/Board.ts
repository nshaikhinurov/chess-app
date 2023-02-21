import { Square } from "./Square";
import { Color } from "./Color";
import { Bishop } from "./pieces/Bishop";
import { King } from "./pieces/King";
import { Knight } from "./pieces/Knight";
import { Pawn } from "./pieces/Pawn";
import { Queen } from "./pieces/Queen";
import { Rook } from "./pieces/Rook";
import * as R from "ramda";
import { Piece, PieceName } from "./pieces/Piece";
export class Board {
  lostWhitePieces: Piece[] = [];
  lostBlackPieces: Piece[] = [];
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
              color: (row + col) % 2 === 0 ? Color.WHITE : Color.BLACK,
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
      new Pawn(Color.WHITE, this.getSquare(i, 6));
      new Pawn(Color.BLACK, this.getSquare(i, 1));
    }
  }

  private addKnights() {
    new Knight(Color.WHITE, this.getSquare(1, 7));
    new Knight(Color.WHITE, this.getSquare(6, 7));
    new Knight(Color.BLACK, this.getSquare(6, 0));
    new Knight(Color.BLACK, this.getSquare(1, 0));
  }

  private addBishops() {
    new Bishop(Color.WHITE, this.getSquare(2, 7));
    new Bishop(Color.WHITE, this.getSquare(5, 7));
    new Bishop(Color.BLACK, this.getSquare(5, 0));
    new Bishop(Color.BLACK, this.getSquare(2, 0));
  }

  private addRooks() {
    new Rook(Color.WHITE, this.getSquare(0, 7));
    new Rook(Color.WHITE, this.getSquare(7, 7));
    new Rook(Color.BLACK, this.getSquare(7, 0));
    new Rook(Color.BLACK, this.getSquare(0, 0));
  }

  private addQueens() {
    new Queen(Color.WHITE, this.getSquare(3, 7));
    new Queen(Color.BLACK, this.getSquare(3, 0));
  }

  private addKings() {
    new King(Color.WHITE, this.getSquare(4, 7));
    new King(Color.BLACK, this.getSquare(4, 0));
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
    newBoard.lostWhitePieces = this.lostWhitePieces;
    newBoard.lostBlackPieces = this.lostBlackPieces;

    return newBoard;
  }

  public addLostPiece(piece: Piece) {
    if (piece.color === Color.WHITE) {
      this.lostWhitePieces.push(piece);
    } else {
      this.lostBlackPieces.push(piece);
    }
  }

  public fakeLostPieces() {
    this.squares
      .flat()
      .filter((square) => square.piece)
      .map((square) => square.piece)
      .forEach((piece) => {
        if (piece && piece.name !== PieceName.KING && Math.random() > 0.5) {
          if (piece.color === Color.WHITE) {
            this.lostWhitePieces.push(piece);
          } else {
            this.lostBlackPieces.push(piece);
          }
        }
      });
  }

  public getPieces(color: Color): Piece[] {
    return this.squares
      .flat()
      .filter((square) => square.piece && square.piece.color === color)
      .map((square) => square.piece as Piece);
  }
}
