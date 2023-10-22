import Button from "./butten";

interface Props {
  row: number;
  column: number;
  mine: number;
}

export default function Game(p: Props) {
  return Array(p.row).fill(0).map((_, rowIndex) =>
    <div className="flex" key={`${rowIndex}`}>
      {
        Array(p.column).fill(0).map((_, columnIndex) =>
          <Button isMine={true} key={`${rowIndex}-${columnIndex}`} ></Button>)
      }
    </div>
  )
}
