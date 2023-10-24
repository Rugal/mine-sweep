import SportsScoreIcon from "@mui/icons-material/SportsScore";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ErrorIcon from '@mui/icons-material/Error';
import { store } from "@store";
import { useSnapshot } from "valtio";
import { getNearByMineNumber, getNearbyCell, Location, } from "../../service/game";

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
  const nearByMineNumber = getNearByMineNumber(p, store);

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
    if (cell.isMine) {
      // gg if this is mine
      store.game.gameOver = true;
      p.backdropHandler(true);
    }
    if (nearByMineNumber > 0) {
      return;
    }
    // TODO: traverse all nearby cell recursively if they are 0
    const queue: Array<Location> = [{ row: p.row, column: p.column, }];
    const visited = new Set<string>();
    while (queue.length > 0) {
      const current = queue.shift()!;
      visited.add(`${current.row}-${current.column}`);
      store.game.cell[current.row][current.column].flag = -1; // now visit this cell

      getNearbyCell(current, store.board)
        .filter((item) => sp.game.cell[item[0]][item[1]].flag != -1) // ensure this cell is not visited
        .filter((item) => getNearByMineNumber({ row: item[0], column: item[1] }, store) == 0) // find cell that matches requirement
        .filter((item) => !visited.has(`${item[0]}-${item[1]}`))
        .forEach((item) => queue.push({ row: item[0], column: item[1], }));

      getNearbyCell(current, store.board)
        .filter((item) => sp.game.cell[item[0]][item[1]].flag != -1)
        .filter((item) => getNearByMineNumber({ row: item[0], column: item[1] }, store) > 0)
        .forEach((item) => store.game.cell[item[0]][item[1]].flag = -1);
    }
  };
  const rightClickHandler = (e) => {
    e.preventDefault();
    if (cell.flag == -1) {
      // do not change if already revealed
      return;
    }
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
