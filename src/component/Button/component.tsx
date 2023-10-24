import SportsScoreIcon from "@mui/icons-material/SportsScore";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ErrorIcon from '@mui/icons-material/Error';
import { store } from "@store";
import { useSnapshot } from "valtio";
import { getNearbyCell } from "../../service/game";

type Props = {
  backdropHandler: (state: boolean) => void;
  column: number;
  row: number;
};

const flagMap = [
  <></>,
  <SportsScoreIcon />,
  <QuestionMarkIcon />,
];

export default function Button(p: Props) {
  const sp = useSnapshot(store);

  const cell = sp.game.cell[p.row][p.column];

  // find nearby mine number
  const nearByMineNumber = getNearbyCell(p, sp.board)
    .map((item) => sp.game.cell[item[0]][item[1]].isMine)
    .filter(Boolean)
    .length;

  const revealedColor = cell.flag == -1 ? "" : "hover:bg-sky-100 bg-sky-300";

  const leftClickHandler = (e) => {
    console.log("Left click");
    if (cell.flag == -1) {
      console.log("already revealed");
      return;
    }
    if (cell.flag > 0) {
      console.log("already flagged");
      return;
    }

    store.game.cell[p.row][p.column].flag = -1;
    if (!cell.isMine) return;

    store.game.gameOver = true;
    p.backdropHandler(true);
  };
  const rightClickHandler = (e) => {
    e.preventDefault();
    store.game.cell[p.row][p.column].flag = (cell.flag + 1) % 3;
  };

  return <button
    onClick={leftClickHandler}
    onContextMenu={rightClickHandler}
    className={`border-solid border border-sky-100 w-6 h-6 flex justify-center items-center ${revealedColor}`} >
    {
      cell.flag == -1
        ? cell.isMine ? <LocalFireDepartmentIcon /> : (nearByMineNumber == 0 ? "" : nearByMineNumber)
        : sp.game.gameOver
          ? cell.isMine && <ErrorIcon />
          : flagMap[cell.flag]
    }
  </button>;
}
