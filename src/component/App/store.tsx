import { proxy, subscribe, } from "valtio";
import { devtools } from "valtio/utils";

interface Board {
  row: number;
  column: number;
  mine: number;
}

export interface Store {
  board: Board;
  gameId: number;
  gameOver: boolean;
  mineSetup: Array<boolean>;
}

const defaultStore: Store = {
  board: {
    column: 32,
    mine: 100,
    row: 16,
  },
  gameId: 0,
  gameOver: false,
  mineSetup: Array(1).fill(false),
};

const LOCAL_STORAGE_KEY = "MineSweep";

export const store = proxy<Store>(
  localStorage.getItem(LOCAL_STORAGE_KEY) == null
    ? defaultStore
    : JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!)
);

devtools(store, { name: "Mine Sweep", enabled: true })

subscribe(store, () => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store)));
