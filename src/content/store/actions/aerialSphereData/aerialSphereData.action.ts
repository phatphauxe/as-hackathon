import { AS } from "../../../../assets/models"
import { Action } from "../action.helpers"
import { ASTypesModel } from "./aerialSphereData.helpers"

export const ASTypes:ASTypesModel = {
	setAerialSphere: 'SET_AERIAL_SPHERE_OBJECT',
}

const setAerialSphere = (aerialSphere:AS):Action<AS> => {
	return {
		type: ASTypes.setAerialSphere,
		payload: aerialSphere,
	}
}

export const AerialSphereActions = {
	setAerialSphere: setAerialSphere,
}