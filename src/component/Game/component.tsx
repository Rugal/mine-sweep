import Button from "./butten";


export default function Game() {
  const row = 10;
  const column = 20;
  return Array(row).fill(0).map((_, rowIndex) =>
    <div className="flex" key={`${rowIndex}`}>
      {
        Array(column).fill(0).map((_, columnIndex) =>
          <Button key={`${rowIndex}-${columnIndex}`} ></Button>)
      }
    </div>
  )
}
