/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752
import { css } from "@emotion/react";
import React, { useEffect } from "react";
import BoardComponent from "./components/BoardComponent";
import PlayerInfoComponent from "./components/PlayerInfoComponent";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Piece } from "./models/pieces/Piece";
import { Player } from "./models/Player";

function App() {
  const [board, setBoard] = React.useState<Board>(new Board());
  const [whitePlayer, setWhitePlayer] = React.useState<Player>(
    new Player(Colors.WHITE)
  );
  const [blackPlayer, setBlackPlayer] = React.useState<Player>(
    new Player(Colors.BLACK)
  );
  const [currentPlayer, setCurrentPlayer] = React.useState<Player | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(restart, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initSquares();
    newBoard.placePieces();
    // newBoard.fakeLostPieces();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  function changeCurrentPlayer() {
    setCurrentPlayer((currentPlayer) =>
      currentPlayer === whitePlayer ? blackPlayer : whitePlayer
    );
  }

  function getAdvantageOfWhite(
    lostWhitePieces: Piece[],
    lostBlackPieces: Piece[]
  ): number {
    let advantage = 0;
    lostWhitePieces.forEach((piece) => {
      advantage -= piece.value;
    });
    lostBlackPieces.forEach((piece) => {
      advantage += piece.value;
    });
    return advantage;
  }

  return (
    <div css={appLayoutStyles}>
      <div css={wrapperStyles}>
        <PlayerInfoComponent
          player={blackPlayer}
          isCurrentPlayer={blackPlayer === currentPlayer}
          capturedPieces={board.lostWhitePieces}
          advantage={
            -getAdvantageOfWhite(board.lostWhitePieces, board.lostBlackPieces)
          }
        />
        <BoardComponent
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          changeCurrentPlayer={changeCurrentPlayer}
        />
        <PlayerInfoComponent
          player={whitePlayer}
          isCurrentPlayer={whitePlayer === currentPlayer}
          capturedPieces={board.lostBlackPieces}
          advantage={getAdvantageOfWhite(
            board.lostWhitePieces,
            board.lostBlackPieces
          )}
        />
      </div>
    </div>
  );
}

export default App;

const appLayoutStyles = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #312e2b;
`;

const wrapperStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 10,
} as const;
