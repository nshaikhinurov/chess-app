/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752
import { css } from "@emotion/react";
import React, { useEffect } from "react";
import BoardComponent from "./components/BoardComponent";
import { Board } from "./models/Board";

function App() {
  const [board, setBoard] = React.useState<Board>(new Board());

  useEffect(restart, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.placePieces();
    setBoard(newBoard);
  }

  return (
    <div css={styles}>
      <BoardComponent board={board} setBoard={setBoard} />
    </div>
  );
}

export default App;

const styles = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #312e2b;
`;
