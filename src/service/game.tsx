import { Cell, Store } from "@store";

export interface Location {
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

export const getNeighbourCell = (location: Location, board: Location) => [-1, 0, 1].flatMap((rowItem) => [-1, 0, 1].map((columnItem) => [rowItem, columnItem]))
  .filter((item) => item[0] == 0 || item[1] == 0)
  .map((item) => [location.row + item[0], location.column + item[1]])
  .filter((item) => item[0] != location.row || item[1] != location.column)
  .filter((item) => 0 <= item[0] && item[0] < board.row && 0 <= item[1] && item[1] < board.column);

export const getNearbyCell = (location: Location, board: Location) => [-1, 0, 1].flatMap((rowItem) => [-1, 0, 1].map((columnItem) => [rowItem, columnItem]))
  .filter((item) => item[0] != 0 || item[1] != 0)
  .map((item) => [location.row + item[0], location.column + item[1]])
  .filter((item) => 0 <= item[0] && item[0] < board.row && 0 <= item[1] && item[1] < board.column);

export const getNearByMineNumber = (location: Location, store: Store) => getNearbyCell(location, store.board)
  .map((item) => store.game.cell[item[0]][item[1]].isMine)
  .filter(Boolean)
  .length;
