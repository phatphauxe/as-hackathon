import { PromiseType } from "../action.helpers";

export interface AppTypesModel {
	appLoaded: string,
	getData: PromiseType,
	setListings: string
	setCurrentZipCode: string
}
