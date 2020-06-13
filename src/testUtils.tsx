import React, { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';

import { rootReducer, Store } from './store';

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

export const renderWithRouter = (
  component: ReactElement,
  store: Store,
  initialEntries?: string[],
) => (
  render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>,
    store,
  )
);

export * from '@testing-library/react';
export { render };
