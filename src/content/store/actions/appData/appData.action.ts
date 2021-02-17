import { getRequest } from "../../../http";
import { Action, PromiseAction } from "../action.helpers";
import { AppTypesModel } from "./appData.helpers";
import { Listing, ZipCode } from "../../../../assets/models/store.model";


export const AppTypes:AppTypesModel = {
	appLoaded: 'APP_LOADED',
	getData: PromiseAction('GET_INIT_DATA'),
	setListings: 'SET_LISTINGS',
	setCurrentZipCode: 'SET_CURRENT_ZIP_CODE'
}

/* EXAMPLE BASIC ACTION */
export const appLoaded = ():Action<boolean> => {
	return {
		type: AppTypes.appLoaded,
		payload: true,
	}
}

/* EXAMPLE PROMISE ACTION */
export const getData = (url:string):Action<Promise<string[]>> => {
	return {
		type: AppTypes.getData.default,
		payload: getRequest<string[]>(url),
	}
}

export const setListings = (listings: Listing[]):Action<Listing[]> => {
	return {
		type: AppTypes.setListings,
		payload: listings,
	}
}

export const setCurrentZipCode = (zipCode: ZipCode):Action<ZipCode> => {
	return {
		type: AppTypes.setCurrentZipCode,
		payload: zipCode,
	}
}


const AppActions = {
	appLoaded: appLoaded,
	setListings: setListings,
	setCurrentZipCode: setCurrentZipCode
};

export default AppActions;
