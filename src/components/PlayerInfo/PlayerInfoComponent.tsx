/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752

import React from "react";
import { Player, Color, Piece } from "src/models";
import PlayerPicture from "./PlayerPicture";
import CapturedPieces from "./CapturedPieces";
import { blockHeight } from "src/consts";
import Timer from "./Timer";

interface PlayerInfoComponentProps {
  player: Player;
  isCurrentPlayer: boolean;
  capturedPieces: Piece[];
  advantage: number;
}

const PlayerInfoComponent: React.FC<PlayerInfoComponentProps> = ({
  player,
  isCurrentPlayer,
  capturedPieces,
  advantage,
}) => {
  return (
    <div css={playerStyles}>
      <PlayerPicture isCurrentPlayer={isCurrentPlayer} player={player} />
      <div css={playerInfoStyles}>
        <div css={{ flex: "1 1 0" }}>
          <h3>{`${
            player.color === Color.WHITE ? "White" : "Black"
          } player`}</h3>
          <CapturedPieces
            capturedPieces={capturedPieces}
            advantage={advantage}
          />
        </div>
        <Timer isActive={isCurrentPlayer} />
      </div>
    </div>
  );
};

export default PlayerInfoComponent;

const playerStyles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "stretch",
  gap: 10,

  "& h3": {
    color: "white",
    height: 0.5 * blockHeight,
  },
};

const playerInfoStyles = {
  width: "100%",
  display: "flex",
} as const;
