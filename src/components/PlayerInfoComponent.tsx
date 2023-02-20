/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752

import React from "react";
import { Player } from "../models/Player";
import whiteKingImg from "../assets/images/large/wk.png";
import blackKingImg from "../assets/images/large/bk.png";
import { borderRadius, selectedWiteSquareColor } from "../consts";
import { Colors } from "../models/Colors";
import cx from "classnames";
import { Piece, Pieces } from "../models/pieces/Piece";

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
      <div css={playerIconStyles} className={cx({ active: isCurrentPlayer })}>
        <img
          src={player.color === Colors.WHITE ? whiteKingImg : blackKingImg}
          alt={`${player.color} player`}
        />
      </div>
      <div css={playerInfoStyles}>
        <h3>{`${player.color === Colors.WHITE ? "White" : "Black"} player`}</h3>
        <div css={capturedPiecesStyles}>
          {capturedPieces
            .sort(
              (p1, p2) =>
                p1.value - p2.value || (p1.name === Pieces.KNIGHT ? -1 : 1)
            )
            .map((piece) => (
              <div key={piece.id}>
                <i
                  className={`cm cm-${
                    piece.color === Colors.WHITE ? "b" : "w"
                  }-${piece.name} ${piece.name}`}
                  aria-hidden="true"
                ></i>
              </div>
            ))}
          {advantage > 0 && <div>+{advantage}</div>}
        </div>
      </div>
    </div>
  );
};

export default PlayerInfoComponent;

const blockHeight = 50;

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

const playerInfoStyles = {
  width: "100%",
} as const;

const capturedPieceSize = 0.5 * blockHeight;
const capturedPiecesStyles = {
  height: capturedPieceSize,
  display: "flex",
  gap: 5,
  color: "#F7F7F7",
  "& .cm": {
    fontSize: capturedPieceSize,
    "&.pawn": {
      margin: "0 -0.2169em",
    },
    "&.knight": {
      margin: "0 -0.0851em",
    },
    "&.bishop": {
      margin: "0 -0.1023em",
    },
    "&.rook": {
      margin: "0 -0.1675em",
    },
    "&.queen": {
      margin: "0 -0.0492em",
    },
  },
} as const;
