import Button from "@component/Button";

interface Props {
  row: number;
  column: number;
  mine: number;
  mineSetup: Array<boolean>;
  backdropHandler: (state: boolean) => void;
}

export default function Board(p: Props) {
  const content = Array(p.row).fill(0).map((_, rowIndex) =>
    <div className="flex" key={`${rowIndex}`}>
      {
        Array(p.column).fill(0).map((_, columnIndex) =>
          <Button
            backdropHandler={p.backdropHandler}
            isMine={p.mineSetup[rowIndex * p.column + columnIndex]}
            key={`${rowIndex}-${columnIndex}`}
          />
        )
      }
    </div>
  )

  return <div>{content}</div>
}
