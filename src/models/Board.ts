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
import { Player } from "./Player";
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

  private addPawns([whitePlayer, blackPlayer]: [Player, Player]) {
    for (let i = 0; i < 8; i++) {
      new Pawn(Color.WHITE, this.getSquare(i, 6), whitePlayer);
      new Pawn(Color.BLACK, this.getSquare(i, 1), blackPlayer);
    }
  }

  private addKnights([whitePlayer, blackPlayer]: [Player, Player]) {
    new Knight(Color.WHITE, this.getSquare(1, 7), whitePlayer);
    new Knight(Color.WHITE, this.getSquare(6, 7), whitePlayer);
    new Knight(Color.BLACK, this.getSquare(6, 0), blackPlayer);
    new Knight(Color.BLACK, this.getSquare(1, 0), blackPlayer);
  }

  private addBishops([whitePlayer, blackPlayer]: [Player, Player]) {
    new Bishop(Color.WHITE, this.getSquare(2, 7), whitePlayer);
    new Bishop(Color.WHITE, this.getSquare(5, 7), whitePlayer);
    new Bishop(Color.BLACK, this.getSquare(5, 0), blackPlayer);
    new Bishop(Color.BLACK, this.getSquare(2, 0), blackPlayer);
  }

  private addRooks([whitePlayer, blackPlayer]: [Player, Player]) {
    new Rook(Color.WHITE, this.getSquare(0, 7), whitePlayer);
    new Rook(Color.WHITE, this.getSquare(7, 7), whitePlayer);
    new Rook(Color.BLACK, this.getSquare(7, 0), blackPlayer);
    new Rook(Color.BLACK, this.getSquare(0, 0), blackPlayer);
  }

  private addQueens([whitePlayer, blackPlayer]: [Player, Player]) {
    new Queen(Color.WHITE, this.getSquare(3, 7), whitePlayer);
    new Queen(Color.BLACK, this.getSquare(3, 0), blackPlayer);
  }

  private addKings([whitePlayer, blackPlayer]: [Player, Player]) {
    new King(Color.WHITE, this.getSquare(4, 7), whitePlayer);
    new King(Color.BLACK, this.getSquare(4, 0), blackPlayer);
  }

  public placePieces(players: [Player, Player]) {
    this.addPawns(players);
    this.addKnights(players);
    this.addBishops(players);
    this.addRooks(players);
    this.addQueens(players);
    this.addKings(players);
  }

  public highlightAvailableSquares(selectedSquare: Square | null) {
    this.squares.flat().forEach((targetSquare) => {
      targetSquare.available = Boolean(
        selectedSquare?.piece?.canMoveTo(targetSquare)
      );
    });
  }

  public clone(): Board {
    const newBoard = new Board();

    newBoard.squares = this.squares;
    newBoard.enPassantSquare = this.enPassantSquare;

    return newBoard;
  }

  public fakeLostPieces() {
    this.squares
      .flat()
      .map((square) => square.piece)
      .filter(Boolean)
      .forEach((piece) => {
        if (piece.name !== PieceName.KING && Math.random() > 0.5) {
          piece.player.addLostPiece(piece);
        }
      });
  }

  public getPieces(color: Color): Piece[] {
    return this.squares
      .flat()
      .filter((square): square is Square & { piece: Piece } =>
        Boolean(square.piece && square.piece.color === color)
      )
      .map((square) => square.piece);
  }
}
