import React, { ReactElement } from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';

import { rootReducer } from './store';

export const storeFactory = (initialState: any = {}) => (
  createStore(rootReducer, initialState, applyMiddleware(thunk))
);

const render = (ui: ReactElement, store: any) => {
  const Wrapper = ({ children }: any) => (
    <Provider store={store}>
      {children}
    </Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper });
};

export * from '@testing-library/react';
export { render };
