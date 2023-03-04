import React, { createContext, useContext, useState } from "react";
import { Board } from "src/models";

type BoardContextType = {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
};

export const BoardContext = createContext<BoardContextType>(
  {} as BoardContextType
);

// interface BoardProviderProps {
//   children: React.ReactNode;
// }

// export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
//   const [board, setBoard] = useState<Board>(new Board());

//   return (
//     <BoardContext.Provider value={{ board, setBoard }}>
//       {children}
//     </BoardContext.Provider>
//   );
// };

export const useBoard = () => {
  return useContext(BoardContext);
};
