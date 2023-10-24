import { useCallback, useEffect, useMemo, useState } from "react";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ErrorIcon from '@mui/icons-material/Error';
import { store } from "@store";
import { useSnapshot } from "valtio";

type Props = {
  backdropHandler: (state: boolean) => void;
  column: number;
  isMine: boolean;
  row: number;
};

const flagMap = [
  <></>,
  <SportsScoreIcon />,
  <QuestionMarkIcon />,
];

export default function Button(p: Props) {
  const [flag, setFlag] = useState<number>(0);
  const [reveal, setReveal] = useState<boolean>(false);
  const sp = useSnapshot(store);

  const getNearbyCell = useCallback((row: number, column: number) => [-1, 0, 1].flatMap((rowItem) => [-1, 0, 1].map((columnItem) => [rowItem, columnItem]))
    .filter((item) => item[0] != 0 || item[1] != 0)
    .map((item) => [row + item[0], column + item[1]])
    .filter((item) => 0 <= item[0] && item[0] < sp.board.row && 0 <= item[1] && item[1] < sp.board.column),
    [sp.board.row, sp.board.column]);

  const getNearbyMineNumber = useCallback((row: number, column: number) => getNearbyCell(row, column)
    .map((item) => sp.mineSetup[sp.board.column * item[0] + item[1]])
    .filter(Boolean)
    .length, [getNearbyCell, sp.board.column, sp.mineSetup]);

  const revealedColor = useMemo(() => reveal ? "" : "hover:bg-sky-100 bg-sky-300", [reveal]);
  const nearByMineNumber = useMemo(() => getNearbyMineNumber(p.row, p.column), [sp.gameId]);
  const nearByMineString = useMemo(() => nearByMineNumber == 0 ? "" : nearByMineNumber, [nearByMineNumber]);

  useEffect(() => {
    setReveal(false);
    setFlag(0);
  }, [sp.gameId]);

  const leftClickHandler = (e) => {
    console.log("Left click");
    setReveal(true);
    if (!p.isMine) return;

    console.log("Game over!");
    store.gameOver = true;
    p.backdropHandler(true);
  };
  const rightClickHandler = (e) => {
    e.preventDefault();
    console.log("Right click");
    setFlag((current) => (current + 1) % 3);
  };

  return <button
    onClick={leftClickHandler}
    onContextMenu={rightClickHandler}
    className={`border-solid border border-sky-100 w-6 h-6 flex justify-center items-center ${revealedColor}`} >
    {
      reveal
        ? p.isMine ? <LocalFireDepartmentIcon /> : nearByMineString
        : sp.gameOver
          ? p.isMine && <ErrorIcon />
          : flagMap[flag]
    }
  </button>;
}
