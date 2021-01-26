import { AS } from "../../../assets/models";
import { ASReducerState } from "../../../assets/models/store.model";
import { ActionTypes } from "../actions";
import { Action } from "../actions/action.helpers";

export type ASReducerAction = AS | null;

export const defaultASReducer:ASReducerState = {
	AS: null,
}

const ASReducer = (state:ASReducerState = defaultASReducer, action:Action<ASReducerAction>) => {
	switch(action.type){
		case ActionTypes.AS.setAerialSphere: {
			const payload = action.payload as AS;
			return {...state, AS: payload};
		}

		default:
			return state;
	}
}
export default ASReducer;