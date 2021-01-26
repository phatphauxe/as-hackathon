import { combineReducers } from 'redux';
import ASReducer from './as.reducer';
import AppDataReducer from './appData.reducer';

export default combineReducers({
	aerialSphereData: ASReducer,
	appData: AppDataReducer,
});