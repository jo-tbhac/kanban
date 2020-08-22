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
    render(
      <App
        fetchAuthState={fetchAuthState}
        isDialogVisible
        isLoading={false}
        ready
      />,
      store,
    );
    expect(fetchAuthState).toHaveBeenCalled();
  });

  test('should render the `Dialog` component if props of `isDialogVisible` is true', () => {
    const { getByTestId } = render(
      <App
        fetchAuthState={fetchAuthState}
        isDialogVisible
        isLoading={false}
        ready
      />,
      store,
    );
    expect(getByTestId('dialog')).not.toBeNull();
  });

  test('should not render the `Dialog` component if props of `isDialogVisible` is false', () => {
    const { queryByTestId } = render(
      <App
        fetchAuthState={fetchAuthState}
        isDialogVisible={false}
        isLoading={false}
        ready
      />,
      store,
    );
    expect(queryByTestId('dialog')).toBeNull();
  });

  test('should render the `Loading` component if props of `isLoading` is true', () => {
    const { getByTestId } = render(
      <App
        fetchAuthState={fetchAuthState}
        isDialogVisible={false}
        isLoading
        ready
      />,
      store,
    );
    expect(getByTestId('loading')).not.toBeNull();
  });

  test('should not render the `Loading` component if props of `isLoading` is false', () => {
    const { queryByTestId } = render(
      <App
        fetchAuthState={fetchAuthState}
        isDialogVisible={false}
        isLoading={false}
        ready
      />,
      store,
    );
    expect(queryByTestId('loading')).toBeNull();
  });

  test('should render the `Loading` component and does not render another components if props of `ready` is false', () => {
    const { getByTestId, container } = render(
      <App
        fetchAuthState={fetchAuthState}
        isDialogVisible
        isLoading
        ready={false}
      />,
      store,
    );
    expect(getByTestId('loading')).not.toBeNull();
    expect(container.children).toHaveLength(1);
  });
});
