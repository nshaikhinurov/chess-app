import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./pieces/Bishop";
import { King } from "./pieces/King";
import { Knight } from "./pieces/Knight";
import { Pawn } from "./pieces/Pawn";
import { Queen } from "./pieces/Queen";
import { Rook } from "./pieces/Rook";

export class Board {
  cells: Cell[][] = [];

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];

      for (let j = 0; j < 8; j++) {
        row.push(
          new Cell({
            board: this,
            x: j,
            y: i,
            color: (i + j) % 2 === 0 ? Colors.WHITE : Colors.BLACK,
            piece: null,
          })
        );
      }

      this.cells.push(row);
    }
  }

  public getCell(x: number, y: number): Cell {
    return this.cells[y][x];
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.WHITE, this.getCell(i, 6));
      new Pawn(Colors.BLACK, this.getCell(i, 1));
    }
  }

  private addKnights() {
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.BLACK, this.getCell(1, 0));
  }

  private addBishops() {
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.BLACK, this.getCell(2, 0));
  }

  private addRooks() {
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.BLACK, this.getCell(0, 0));
  }

  private addQueens() {
    new Queen(Colors.WHITE, this.getCell(3, 7));
    new Queen(Colors.BLACK, this.getCell(3, 0));
  }

  private addKings() {
    new King(Colors.WHITE, this.getCell(4, 7));
    new King(Colors.BLACK, this.getCell(4, 0));
  }

  public placePieces() {
    this.addPawns();
    this.addKnights();
    this.addBishops();
    this.addRooks();
    this.addQueens();
    this.addKings();
  }

  public highlightAvailableCells(selectedCell: Cell | null) {
    // for (let i = 0; i < this.cells.length; i++) {
    //   const row = this.cells[i];
    //   for (let j = 0; j < this.cells.length; j++) {
    //     const target = row[j];
    //     target.available = Boolean(selectedCell?.piece?.canMoveTo(target));
    //   }
    // }
    this.cells.flat().forEach((targetCell) => {
      targetCell.available = Boolean(
        selectedCell?.piece?.canMoveTo(targetCell)
      );
    });
  }

  public getCopy(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    return newBoard;
  }
}
