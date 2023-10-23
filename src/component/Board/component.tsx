import Button from "./butten";

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

export default function Game(p: Props) {
  const mine = createMineArray(p.column * p.row, p.mine);

  return Array(p.row).fill(0).map((_, rowIndex) =>
    <div className="flex" key={`${rowIndex}`}>
      {
        Array(p.column).fill(0).map((_, columnIndex) =>
          <Button
            isMine={mine[rowIndex * p.column + columnIndex]}
            key={`${rowIndex}-${columnIndex}`}
          />
        )
      }
    </div>
  )
}
