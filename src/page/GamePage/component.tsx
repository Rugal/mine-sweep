import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Board from "@component/Board";

export default function GamePage() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  // TODO: able to show backdrop when clicking on bomb
  // TODO: show summary
  // TODO: start new game by closing backdrop
  return <div className="container mx-auto flex justify-center">
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    />

    <Board row={16} column={32} mine={100} />
  </div>
}
