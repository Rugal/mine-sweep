import { proxy, subscribe, } from "valtio";
import type { } from "@redux-devtools/extension";
import { devtools } from "valtio/utils";
import * as locales from '@mui/material/locale';

type SupportedLocales = keyof typeof locales;

export interface Store {
  token: string | undefined;
  loading: boolean;
  locale: SupportedLocales;
}

const LOCAL_STORAGE_KEY = "kirin";

export const store = proxy<Store>(
  localStorage.getItem(LOCAL_STORAGE_KEY) == null
    ? { token: undefined, loading: false, locale: "enUS", }
    : JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!)
);

devtools(store, { name: "state name", enabled: true })

subscribe(store, () => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store)));
