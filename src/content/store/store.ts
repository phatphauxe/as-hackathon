import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from './reducers';
/* 
import { State } from '../../assets/models/store.model';
import { defaultAppState } from './reducers/appData.reducer';
import { defaultASReducer } from './reducers/as.reducer';

const defaultState:State = {
	appData: defaultAppState,
 	aerialSphereData: defaultASReducer,
}
*/
const store =  createStore(reducers, {/*...defaultState*/}, composeWithDevTools(applyMiddleware(promiseMiddleware)));

export default store;