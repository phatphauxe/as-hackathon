import { State } from "../../../assets/models/store.model";

/* EXAMPLE SELECTORS */
export const selectAppLoaded = (state:State):boolean => state?.appData?.appLoaded ?? false;

export const selectAppData = (state:State):string[] | null => state?.appData?.data ?? null;