import { AS } from ".";

export interface ASReducerState {
	AS: AS | null;
}

export interface AppDataReducerState {
	appLoaded: boolean;
	data: string[] | null;
}

export interface State {
	appData: AppDataReducerState,
	aerialSphereData: ASReducerState
}