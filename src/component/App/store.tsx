import { proxy, subscribe, } from "valtio";
import { devtools } from "valtio/utils";

export interface Store {
  token: string | undefined;
  loading: boolean;
}

const LOCAL_STORAGE_KEY = "kirin";

export const store = proxy<Store>(
  localStorage.getItem(LOCAL_STORAGE_KEY) == null
    ? { token: undefined, loading: false, }
    : JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!)
);

devtools(store, { name: "state name", enabled: true })

subscribe(store, () => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store)));
