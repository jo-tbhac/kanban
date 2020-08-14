import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import boardReducer from './board/reducers';
import dialogReducer from './dialog/reducers';
import labelReducer from './label/reducers';
import sessionReducer from './session/reducers';
import searchReducer from './search/reducers';
import checkListReducer from './check_list/reducers';
import fileReducer from './file/reducers';
import loadingReducer from './loading/reducers';
import backgroundImageReducer from './background_image/reducers';

export const rootReducer = combineReducers({
  board: boardReducer,
  dialog: dialogReducer,
  label: labelReducer,
  session: sessionReducer,
  search: searchReducer,
  checkList: checkListReducer,
  file: fileReducer,
  loading: loadingReducer,
  backgroundImage: backgroundImageReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type Store = typeof store

export default store;
