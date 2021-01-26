import { AppDataReducerState } from "../../../assets/models/store.model";
import { ActionTypes } from "../actions";
import { Action } from "../actions/action.helpers";


export type AppDataAction = string[] | boolean | number | string | null | undefined;

export const defaultAppState:AppDataReducerState = {
	appLoaded: false,
	data: null,
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
		
		default: 
			return state;
	}
}

export default AppDataReducer;