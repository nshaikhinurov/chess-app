/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752

import React from "react";
import { blockHeight } from "src/consts";
import { Color, Piece, Player } from "src/models";
import CapturedPieces from "./CapturedPieces";
import PlayerPicture from "./PlayerPicture";
import Timer from "./Timer";

interface PlayerInfoComponentProps {
  player: Player;
  capturedPieces: Piece[];
  isCurrentPlayer: boolean;
  advantage: number;
  onTimeout: (player: Player) => void;
}

const PlayerInfoComponent: React.FC<PlayerInfoComponentProps> = ({
  player,
  capturedPieces,
  isCurrentPlayer,
  advantage,
  onTimeout,
}) => {
  const playerNameHeader = (
    <h3>{player.color === Color.WHITE ? "White" : "Black"} player</h3>
  );

  return (
    <div css={playerStyles}>
      <PlayerPicture isCurrentPlayer={isCurrentPlayer} player={player} />
      <div css={playerInfoStyles}>
        <div css={{ flex: "1 1 0" }}>
          {playerNameHeader}
          <CapturedPieces
            capturedPieces={capturedPieces}
            advantage={advantage}
          />
        </div>
        <Timer
          key={player.id}
          isActive={isCurrentPlayer}
          onTimeout={() => onTimeout(player)}
        />
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
