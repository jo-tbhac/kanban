import React from 'react';

import { storeFactory, render } from '../../../testUtils';
import { Store } from '../../../store';
import { App } from '../../../components/app/App';

describe('App component', () => {
  let store: Store;
  let fetchAuthState: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    fetchAuthState = jest.fn();
  });

  test('should call `fetchAuthState` upon a component did mount', () => {
    render(<App fetchAuthState={fetchAuthState} isDialogVisible isLoading />, store);
    expect(fetchAuthState).toHaveBeenCalled();
  });

  test('should render the `Dialog` component if props of `isDialogVisible` is true', () => {
    const { getByTestId } = render(
      <App fetchAuthState={fetchAuthState} isDialogVisible isLoading={false} />,
      store,
    );
    expect(getByTestId('dialog')).not.toBeNull();
  });

  test('should not render the `Dialog` component if props of `isDialogVisible` is false', () => {
    const { queryByTestId } = render(
      <App fetchAuthState={fetchAuthState} isDialogVisible={false} isLoading={false} />,
      store,
    );
    expect(queryByTestId('dialog')).toBeNull();
  });

  test('should render the `Loading` component if props of `isLoading` is true', () => {
    const { getByTestId } = render(
      <App fetchAuthState={fetchAuthState} isDialogVisible={false} isLoading />,
      store,
    );
    expect(getByTestId('loading')).not.toBeNull();
  });

  test('should not render the `Loading` component if props of `isLoading` is false', () => {
    const { queryByTestId } = render(
      <App fetchAuthState={fetchAuthState} isDialogVisible={false} isLoading={false} />,
      store,
    );
    expect(queryByTestId('loading')).toBeNull();
  });
});
