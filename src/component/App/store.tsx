import { proxy, subscribe, } from "valtio";
import { devtools } from "valtio/utils";

export interface Store {
  gameId: number;
  gameOver: boolean;
}

const defaultStore: Store = {
  gameId: 0,
  gameOver: false,
};

const LOCAL_STORAGE_KEY = "MineSweep";

export const store = proxy<Store>(
  localStorage.getItem(LOCAL_STORAGE_KEY) == null
    ? defaultStore
    : JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!)
);

devtools(store, { name: "Mine Sweep", enabled: true })

subscribe(store, () => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store)));
