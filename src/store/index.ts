import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import boardReducer from './board/reducers';
import dialogReducer from './dialog/reducers';
import sessionReducer from './session/reducers';

export const rootReducer = combineReducers({
  board: boardReducer,
  dialog: dialogReducer,
  session: sessionReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export default store;
