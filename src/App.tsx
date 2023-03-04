/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752
import { css } from "@emotion/react";
import React, { useEffect } from "react";
import BoardComponent from "./components/BoardComponent";
import PlayerInfoComponent from "./components/PlayerInfo/PlayerInfoComponent";
import { backgroundColor } from "./consts";
import { BoardContext } from "./contexts/BoardProvider";
import { Board, Color, Piece, Player } from "./models";

function App() {
  const [board, setBoard] = React.useState<Board>(new Board());

  const [whitePlayer, setWhitePlayer] = React.useState<Player>(
    new Player(Color.WHITE)
  );
  const [blackPlayer, setBlackPlayer] = React.useState<Player>(
    new Player(Color.BLACK)
  );
  const [currentPlayer, setCurrentPlayer] = React.useState<Player | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(restart, []);

  function restart() {
    const newWhitePlayer = new Player(Color.WHITE);
    const newBlackPlayer = new Player(Color.BLACK);
    const newBoard = new Board();

    newBoard.initSquares();
    newBoard.placePieces([newWhitePlayer, newBlackPlayer]);
    // newBoard.fakeLostPieces();

    setBoard(newBoard);
    setWhitePlayer(newWhitePlayer);
    setBlackPlayer(newBlackPlayer);
    setCurrentPlayer(newWhitePlayer);
  }

  function toggleCurrentPlayer() {
    setCurrentPlayer((currentPlayer) =>
      currentPlayer === whitePlayer ? blackPlayer : whitePlayer
    );
  }

  function onTimeout(player: Player) {
    if (player === whitePlayer) {
      setImmediate(() => {
        alert("Black player wins!");
      });
    } else {
      setImmediate(() => {
        alert("White player wins!");
      });
    }

    restart();
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

  const advantageOfWhite = getAdvantageOfWhite(
    whitePlayer.lostPieces,
    blackPlayer.lostPieces
  );

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      <div css={appLayoutStyles}>
        <div css={wrapperStyles}>
          <PlayerInfoComponent
            player={blackPlayer}
            capturedPieces={whitePlayer.lostPieces}
            isCurrentPlayer={currentPlayer === blackPlayer}
            advantage={-advantageOfWhite}
            onTimeout={onTimeout}
          />
          <BoardComponent
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            changeCurrentPlayer={toggleCurrentPlayer}
          />
          <PlayerInfoComponent
            player={whitePlayer}
            capturedPieces={blackPlayer.lostPieces}
            isCurrentPlayer={currentPlayer === whitePlayer}
            advantage={advantageOfWhite}
            onTimeout={onTimeout}
          />
        </div>
      </div>
    </BoardContext.Provider>
  );
}

export default App;

const appLayoutStyles = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${backgroundColor};
`;

const wrapperStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 10,
} as const;
