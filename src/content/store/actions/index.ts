import { AerialSphereActions, ASTypes } from "./aerialSphereData/aerialSphereData.action";
import { ASTypesModel } from "./aerialSphereData/aerialSphereData.helpers";
import AppActions, { AppTypes } from "./appData/appData.action";
import { AppTypesModel } from "./appData/appData.helpers";


interface ActionTypesModel {
	App: AppTypesModel,
	AS: ASTypesModel,
}

export const ActionTypes:ActionTypesModel = {
	App: AppTypes,
	AS: ASTypes,
}

export const ActionModels = {
	App: AppActions,
	AS: AerialSphereActions,
}