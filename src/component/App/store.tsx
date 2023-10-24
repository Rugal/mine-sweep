import { initializeBoard } from "../../service/game";
import { proxy, subscribe, } from "valtio";
import { devtools } from "valtio/utils";

interface Board {
  row: number;
  column: number;
  mine: number;
}

export interface Cell {
  isMine: boolean;
  /**
   * -1 reveal
   *  0 nothing
   *  1 flag
   *  2 unsure
   */
  flag: number;
}

interface Game {
  id: number;
  gameOver: boolean;
  cell: Array<Array<Cell>>;
}

export interface Store {
  board: Board;
  game: Game;
}

const defaultStore: Store = {
  board: {
    column: 32,
    mine: 100,
    row: 16,
  },
  game: {
    cell: initializeBoard(16, 32, 100),
    id: 0,
    gameOver: false,
  },
};

const LOCAL_STORAGE_KEY = "MineSweep";

export const store = proxy<Store>(
  localStorage.getItem(LOCAL_STORAGE_KEY) == null
    ? defaultStore
    : JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!)
);

devtools(store, { name: LOCAL_STORAGE_KEY, enabled: true })

subscribe(store, () => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store)));
