import Button from "@component/Button";
import { useSnapshot } from "valtio";
import { store } from "@store";

interface Props {
  backdropHandler: (state: boolean) => void;
}

export default function Board(p: Props) {
  const sp = useSnapshot(store);

  const content = Array(sp.board.row).fill(0).map((_, rowIndex) =>
    <div className="flex" key={`${rowIndex}`}>
      {
        Array(sp.board.column).fill(0).map((_, columnIndex) =>
          <Button
            backdropHandler={p.backdropHandler}
            column={columnIndex}
            key={`${rowIndex}-${columnIndex}`}
            row={rowIndex}
          />
        )
      }
    </div>
  )

  return <div>{content}</div>
}
