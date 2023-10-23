import SportsScoreIcon from "@mui/icons-material/SportsScore";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ErrorIcon from '@mui/icons-material/Error';
import { useEffect, useMemo, useState } from "react";
import { store } from "@store";
import { useSnapshot } from "valtio";

type Props = {
  backdropHandler: (state: boolean) => void;
  column: number;
  isMine: boolean;
  row: number;
};

export default function Button(p: Props) {
  const [flag, setFlag] = useState<number>(0);
  const [reveal, setReveal] = useState<boolean>(false);
  const sp = useSnapshot(store);

  const getNearbyMineNumber = (row: number, column: number) => [-1, 0, 1].flatMap((rowItem) => [-1, 0, 1].map((columnItem) => [rowItem, columnItem]))
    .filter((item) => item[0] != 0 || item[1] != 0)
    .map((item) => [row + item[0], column + item[1]])
    .filter((item) => 0 <= item[0] && item[0] < sp.board.row && 0 <= item[1] && item[1] < sp.board.column)
    .map((item) => sp.mineSetup[sp.board.column * item[0] + item[1]])
    .filter(Boolean).length;

  useEffect(() => {
    setReveal(false);
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

  const revealedColor = useMemo(() => reveal ? "" : "hover:bg-sky-100 bg-sky-300", [reveal]);

  return <button
    onClick={leftClickHandler}
    onContextMenu={rightClickHandler}
    className={`border-solid border border-sky-100 w-6 h-6 flex justify-center items-center ${revealedColor}`} >
    {reveal && p.isMine && <LocalFireDepartmentIcon />}
    {reveal && !p.isMine && getNearbyMineNumber(p.row, p.column)}
    {!reveal && sp.gameOver && p.isMine && <ErrorIcon />}
    {!reveal && flag === 1 && <SportsScoreIcon />}
    {!reveal && flag === 2 && <QuestionMarkIcon />}
  </button>;
}
