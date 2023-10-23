import Button from "@component/Button";
import { store } from "@store";
import { useSnapshot } from "valtio";

interface Props {
  backdropHandler: (state: boolean) => void;
  row: number;
  column: number;
  mine: number;
}

export default function Board(p: Props) {
  const sp = useSnapshot(store);

  const content = Array(p.row).fill(0).map((_, rowIndex) =>
    <div className="flex" key={`${rowIndex}`}>
      {
        Array(p.column).fill(0).map((_, columnIndex) =>
          <Button
            backdropHandler={p.backdropHandler}
            column={columnIndex}
            isMine={sp.mineSetup[rowIndex * p.column + columnIndex]}
            key={`${rowIndex}-${columnIndex}`}
            row={rowIndex}
          />
        )
      }
    </div>
  )

  return <div>{content}</div>
}
