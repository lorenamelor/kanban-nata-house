import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware, } from 'redux-observable';

// REDUCERS AND EPICS EXPORTS

import appStateReducer, { epics as appStateEpics, init,  } from './app/state';



// COMBINED REDUCERS

const rootReducer = combineReducers({
	appState: appStateReducer,
});

// COMBINED EPICS

const rootEpic = combineEpics(
	appStateEpics,
);


const epicMiddleware = createEpicMiddleware();
const composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(epicMiddleware)),
)

export default store;

epicMiddleware.run(rootEpic);

store.dispatch(init());
