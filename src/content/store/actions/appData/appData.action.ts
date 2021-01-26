import { getRequest } from "../../../http";
import { Action, PromiseAction } from "../action.helpers";
import { AppTypesModel } from "./appData.helpers";


export const AppTypes:AppTypesModel = {
	appLoaded: 'APP_LOADED',
	getData: PromiseAction('GET_INIT_DATA'),
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

const AppActions = {
		appLoaded: appLoaded,
};

export default AppActions;