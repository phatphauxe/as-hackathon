import { AppDataReducerState, Listing, ZipCode } from "../../../assets/models/store.model";
import { ActionTypes } from "../actions";
import { Action } from "../actions/action.helpers";
import { zipCodes } from "../../../browser/components/as-viewer/zipCodes";
import { listings } from "../../../browser/components/as-viewer/mlsData";


export type AppDataAction = string[] | boolean | number | string | ZipCode | Listing[] | null | undefined;

export const defaultAppState:AppDataReducerState = {
	appLoaded: false,
	data: null,
	zipCodes: zipCodes,
	currentZipCode: {zip: '85028', mls:'OW542DCT1SQ', city:'Phoenix'},
	listings: listings
}

const App = ActionTypes.App;

const AppDataReducer = (state:AppDataReducerState = defaultAppState, action: Action<AppDataAction>):AppDataReducerState => {
	switch(action.type){
		// appLoaded
		case App.appLoaded: {
			return {...state, appLoaded: true};
		}
		//getData
		case App.getData.pending: {
			return { ...state, data: null }
		}
		case App.getData.rejected: {
			return { ...state, data: [] };
		}
		case App.getData.fulfilled: {
			return { ...state, data: action.payload as string[]}
		}
		case App.setListings: {
			return { ...state, listings: action.payload as Listing[]}
		}
		case App.setCurrentZipCode: {
			return { ...state, currentZipCode: action.payload as ZipCode}
		}
		default:
			return state;
	}
}

export default AppDataReducer;
