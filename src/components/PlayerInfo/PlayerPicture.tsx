/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752import React from "react";

import { Player, Color } from "src/models";
import whiteKingImg from "src/assets/images/wk.png";
import blackKingImg from "src/assets/images/bk.png";
import cx from "classnames";
import { borderRadius, selectedWiteSquareColor, blockHeight } from "src/consts";

interface PlayerPictureProps {
  isCurrentPlayer: boolean;
  player: Player;
}

const PlayerPicture: React.FC<PlayerPictureProps> = ({
  isCurrentPlayer,
  player,
}) => {
  return (
    <div css={playerIconStyles} className={cx({ active: isCurrentPlayer })}>
      <img
        draggable="false"
        src={player.color === Color.WHITE ? whiteKingImg : blackKingImg}
        alt={`${player.color} player`}
      />
    </div>
  );
};

export default PlayerPicture;

const playerIconStyles = {
  width: blockHeight,
  height: blockHeight,
  flexShrink: 0,
  borderRadius,
  backgroundColor: "white",
  "&.active": {
    backgroundColor: selectedWiteSquareColor,
  },

  "& img": {
    display: "block",
    width: "100%",
    height: "100%",
  },
} as const;
