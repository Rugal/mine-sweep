import { useCallback, useMemo, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Board from "@component/Board";
import { store } from "@store";
import { useSnapshot } from "valtio";

interface Props {
  row: number;
  column: number;
  mine: number;
}

const getRandomInt: (bound: number) => number = (bound: number) => Math.floor(Math.random() * bound);

const createMineArray: (capacity: number, mine: number) => Array<boolean> = (capacity: number, mine: number) => {
  const set = new Set<number>();
  while (set.size < mine) {
    set.add(getRandomInt(capacity));
  }

  return Array<boolean>(capacity)
    .fill(false)
    .map((_, index) => set.has(index));
};


export default function GamePage(p: Props) {
  const [open, setOpen] = useState(false);
  const sp = useSnapshot(store);

  store.mineSetup = useMemo(() => createMineArray(p.column * p.row, p.mine), [sp.gameId]);

  const backdropClickHandler = useCallback(() => {
    setOpen(false)
    store.gameOver = false;
    store.gameId = getRandomInt(Number.MAX_VALUE);
  }, []);

  // TODO: show summary
  return <div className="container mx-auto flex justify-center">
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={backdropClickHandler}
    />

    <Board row={p.row} column={p.column} mine={p.mine} backdropHandler={setOpen} />
  </div>
}
