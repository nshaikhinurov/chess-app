/** @jsxImportSource @emotion/react */
// https://github.com/emotion-js/emotion/issues/2752
import cx from "classnames";
import React from "react";
import { cellSize } from "../consts";
import { Cell } from "../models/Cell";

interface CellComponentProps {
  cell: Cell;
  selected: boolean;
  onClick: (cell: Cell) => void;
}

const CellComponent: React.FC<CellComponentProps> = ({
  cell,
  selected,
  onClick,
}) => {
  return (
    <div
      className={cx(cell.color, {
        selected,
        hoverable: !selected && cell.piece,
      })}
      css={cellStyles}
      onClick={() => onClick(cell)}
    >
      {cell.available && (
        <div
          className={cx({ taking: cell.piece })}
          css={availableDotStyles}
        ></div>
      )}
      {cell.piece && (
        <img
          css={pieceStyles}
          src={cell.piece.image}
          alt={`${cell.piece.color} ${cell.piece.name}`}
        />
      )}
    </div>
  );
};

export default CellComponent;

const cellSizeStyles = {
  width: `${cellSize}px`,
  height: `${cellSize}px`,
};

const cellStyles = {
  ...cellSizeStyles,
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
  ...cellSizeStyles,
  position: "relative",
} as const;

const availableDotStyles = {
  position: "absolute",
  width: `${0.33 * cellSize}px`,
  height: `${0.33 * cellSize}px`,
  backgroundColor: "rgba(0,0,0,0.1)",
  borderRadius: "50%",
  overflow: "hidden",
  "&.taking": {
    ...cellSizeStyles,
    backgroundColor: "transparent",
    boxShadow: "inset 0px 0px 0px 6px rgba(0,0,0,0.1)",
  },
} as const;
