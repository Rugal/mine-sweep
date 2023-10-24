import { useCallback, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Board from "@component/Board";
import { store } from "@store";
import { useSnapshot } from "valtio";
import { getRandomInt, initializeBoard } from "../../service/game";

export default function GamePage() {
  const [open, setOpen] = useState(false);
  const sp = useSnapshot(store);

  useEffect(() => {
    // initialize the entire board if game id change
    console.log("Initialize game");
    store.game.cell = initializeBoard(sp.board.row, sp.board.column, sp.board.mine);
    store.game.gameOver = false;
  }, [sp.game.id]);

  const backdropClickHandler = useCallback(() => {
    setOpen(false)
    // to trigger initialization
    store.game.id = getRandomInt(Number.MAX_VALUE);
  }, []);

  // TODO: show summary
  return <div className="container mx-auto flex justify-center">
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={backdropClickHandler}
    />
    <Board backdropHandler={setOpen} />
  </div>
}
