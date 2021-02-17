import { Listing, State, ZipCode } from "../../../assets/models/store.model";
import { listings } from "../../../browser/components/as-viewer/mlsData";
import { zipCodes } from "../../../browser/components/as-viewer/zipCodes";

/* EXAMPLE SELECTORS */
export const selectAppLoaded = (state:State):boolean => state?.appData?.appLoaded ?? false;

export const selectAppData = (state:State):string[] | null => state?.appData?.data ?? null;

export const selectZipCodes = (state:State):ZipCode[] => state?.appData?.zipCodes ?? zipCodes;

export const selectCurrentZipCode = (state:State):ZipCode => state?.appData?.currentZipCode ?? {zip: '85028', mls:'OW542DCT1SQ', city:'Phoenix'};

export const selectListings = (state:State):Listing[] => state?.appData?.listings ?? listings;
