import SportsScoreIcon from "@mui/icons-material/SportsScore";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ErrorIcon from '@mui/icons-material/Error';
import { useState } from "react";

type Props = {
  isMine: boolean;
};

export default function Button(p: Props) {

  const [flag, setFlag] = useState<number>(0);

  const leftClickHandler = (e) => {
    console.log("Left click");
  };
  const rightClickHandler = (e) => {
    e.preventDefault();
    console.log("Right click");
    setFlag((current) => (current + 1) % 3);
  };

  return <button
    onClick={leftClickHandler}
    onContextMenu={rightClickHandler}
    className="border-solid border border-sky-500 w-6 h-6 flex justify-center items-center" >
    {/* {p.isMine && <ErrorIcon />} */}
    {flag === 1 && <SportsScoreIcon />}
    {flag === 2 && <QuestionMarkIcon />}
  </button>;
}
