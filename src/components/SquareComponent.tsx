/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752
import cx from "classnames";
import React from "react";
import { squareSize } from "../consts";
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
      className={cx(square.color, {
        selected,
        hoverable: !selected && square.piece,
      })}
      css={squareStyles}
      onClick={() => onClick(square)}
    >
      {square.available && (
        <div
          className={cx({ taking: square.piece })}
          css={availableDotStyles}
        ></div>
      )}
      {square.piece && (
        <img
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

const squareStyles = {
  ...squareSizeStyles,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "&.white": {
    backgroundColor: "#edeed1",
    "&.selected": {
      backgroundColor: "#F7F769",
    },
  },

  "&.black": {
    backgroundColor: "#779952",
    "&.selected": {
      backgroundColor: "#BCCD29",
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
  width: `${0.33 * squareSize}px`,
  height: `${0.33 * squareSize}px`,
  backgroundColor: "rgba(0,0,0,0.1)",
  borderRadius: "50%",
  overflow: "hidden",
  "&.taking": {
    ...squareSizeStyles,
    backgroundColor: "transparent",
    boxShadow: "inset 0px 0px 0px 6px rgba(0,0,0,0.1)",
  },
} as const;
