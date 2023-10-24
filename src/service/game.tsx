import { Cell } from "@store";

interface Location {
  row: number;
  column: number;
}

export const getRandomInt: (bound: number) => number = (bound: number) => Math.floor(Math.random() * bound);

export const initializeBoard = (row: number, column: number, mine: number,) => {
  const set = new Set<number>();
  while (set.size < mine) {
    set.add(getRandomInt(row * column));
  }

  return Array<boolean>(row * column)
    .fill(false)
    .map((_, index) => ({ isMine: set.has(index), flag: 0, }) as Cell)
    .reduce((rows: Cell[][], key: Cell, index: number,) => {
      (index % column == 0 ? rows.push([key]) : rows[rows.length - 1].push(key))
      return rows;
    }, []);
};

export const getNearbyCell = (location: Location, board: Location) => [-1, 0, 1].flatMap((rowItem) => [-1, 0, 1].map((columnItem) => [rowItem, columnItem]))
  .filter((item) => item[0] != 0 || item[1] != 0)
  .map((item) => [location.row + item[0], location.column + item[1]])
  .filter((item) => 0 <= item[0] && item[0] < board.row && 0 <= item[1] && item[1] < board.column);
