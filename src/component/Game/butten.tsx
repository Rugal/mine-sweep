import SportsScoreIcon from "@mui/icons-material/SportsScore";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useState } from "react";

type Props = {
};

export default function Button(p: Props) {

  const [flag, setFlag] = useState<number>(0);

  const clickHandler = (e) => {
    if (e.type === "click") {
      console.log("Left click");
      return;
    }
    console.log("Right click");
    setFlag((current) => (current + 1) % 3);
  };

  return <button
    onClick={clickHandler}
    onContextMenu={clickHandler}
    className="border-solid border border-sky-500 w-6 h-6 flex justify-center items-center" >
    {flag === 1 && <SportsScoreIcon />}
    {flag === 2 && <QuestionMarkIcon />}
  </button>;
}
