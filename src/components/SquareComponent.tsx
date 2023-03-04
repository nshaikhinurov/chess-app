/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752
import cx from "classnames";
import React from "react";
import {
  blackSquareColor,
  selectedBlackSquareColor,
  selectedWiteSquareColor,
  squareSize,
  whiteSquareColor,
} from "../consts";
import { Square } from "../models/Square";

interface SquareComponentProps {
  square: Square;
  selected: boolean;
  onClick: (square: Square) => void;
}

const SquareComponent: React.FC<SquareComponentProps> = ({
  square,
  selected,
  onClick,
}) => {
  return (
    <div
      className={cx("square", square.color, {
        selected,
        hoverable: !selected && square.piece,
      })}
      css={squareStyles}
      onClick={() => onClick(square)}
    >
      {square.id[1] === "1" && (
        <div className="file" css={squareIdStyles}>
          {square.id[0]}
        </div>
      )}
      {square.id[0] === "a" && (
        <div className="rank" css={squareIdStyles}>
          {square.id[1]}
        </div>
      )}
      <div
        className={cx("dot", {
          visible: square.available,
          capturable: square.piece,
        })}
        css={availableDotStyles}
      ></div>

      {square.piece && (
        <img
          draggable="false"
          css={pieceStyles}
          src={square.piece.image}
          alt={`${square.piece.color} ${square.piece.name}`}
        />
      )}
    </div>
  );
};

export default SquareComponent;

const squareSizeStyles = {
  width: `${squareSize}px`,
  height: `${squareSize}px`,
};

const squareIdStyles = {
  position: "absolute",
  fontSize: "0.8em",
  fontWeight: "bold",
  ".square.white &": {
    color: blackSquareColor,
  },
  ".square.black &": {
    color: whiteSquareColor,
  },
  "&.rank": {
    top: "0.2em",
    left: "0.2em",
  },
  "&.file": {
    bottom: "0.2em",
    right: "0.2em",
  },
} as const;

const squareStyles = {
  ...squareSizeStyles,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",

  "&.white": {
    backgroundColor: whiteSquareColor,
    "&.selected": {
      backgroundColor: selectedWiteSquareColor,
    },
  },

  "&.black": {
    backgroundColor: blackSquareColor,
    "&.selected": {
      backgroundColor: selectedBlackSquareColor,
    },
  },

  "&.hoverable:hover": {
    boxShadow: "inset 0px 0px 0px 2px #fff",
  },
} as const;

const pieceStyles = {
  ...squareSizeStyles,
  position: "relative",
} as const;

const availableDotStyles = {
  position: "absolute",
  width: 0,
  height: 0,
  borderRadius: "50%",
  overflow: "hidden",
  transition: "all 0.075s linear",

  "&.visible": {
    width: `${0.33 * squareSize}px`,
    height: `${0.33 * squareSize}px`,
    boxShadow: "inset 0px 0px 0px 30px rgba(0,0,0,0.1)",
    ".square:hover &:not(.capturable)": {
      width: `${0.45 * squareSize}px`,
      height: `${0.45 * squareSize}px`,
    },
    "&.capturable": {
      ...squareSizeStyles,
      boxShadow: "inset 0px 0px 0px 6px rgba(0,0,0,0.1)",
      ".square:hover &": {
        boxShadow: "inset 0px 0px 0px 35px rgba(0,0,0,0.1)",
      },
    },
  },
} as const;
