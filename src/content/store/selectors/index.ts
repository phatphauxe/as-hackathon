import { AS } from '../../../assets/models';
import { State } from '../../../assets/models/store.model';
import * as AppSelectors from './appData.selector';
import * as ASSelectors from './aerialSphereData.selector';

export interface AppSelectorsModel {
	selectAppLoaded: (state:State) => boolean;
	selectAppData: (state:State) => string[] | null;
}

export interface ASSelectorsModel {
	selectAerialSphere: (state:State) => AS | null;
}

export interface SelectorsModel {
	App: AppSelectorsModel,
	AS: ASSelectorsModel,
}
const Selectors:SelectorsModel = {
	App: AppSelectors,
	AS: ASSelectors,
}

export default Selectors;