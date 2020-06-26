import React from 'react';
import { Route } from 'react-router-dom';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { mockLabels } from '../../utils/mockData';
import { LabelIndex } from '../../components/LabelIndex';

describe('<LabelIndex>', () => {
  let store: Store;
  let fetchAllLabel: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    fetchAllLabel = jest.fn();
  });

  test('should show `LabelEdit` when state of `isLabelEditVisible` is true', () => {
    const { getByTestId } = renderWithRouter(
      <LabelIndex fetchAllLabel={fetchAllLabel} labels={mockLabels} />,
      store,
    );
    fireEvent.click(getByTestId('addLabelButton'));

    expect(getByTestId('labelEdit')).toBeVisible();
  });

  test('should hide `LabelEdit` when state of `isLabelEditVisible` is false', () => {
    const { queryByTestId } = renderWithRouter(
      <LabelIndex fetchAllLabel={fetchAllLabel} labels={mockLabels} />,
      store,
    );
    expect(queryByTestId('labelEdit')).toBeNull();
  });

  test('should call `fetchAllLabel` when component did mount', () => {
    renderWithRouter(
      <Route
        path="/board/:boardId"
        render={() => <LabelIndex fetchAllLabel={fetchAllLabel} labels={mockLabels} />}
      />,
      store,
      ['/board/1'],
    );

    expect(fetchAllLabel).toHaveBeenCalled();
  });

  test('should not call `fetchAllLabel` if url params is invalid when component did mount', () => {
    renderWithRouter(
      <Route
        path="/board/:boardId"
        render={() => <LabelIndex fetchAllLabel={fetchAllLabel} labels={mockLabels} />}
      />,
      store,
      ['/board/xmfsinrub'],
    );

    expect(fetchAllLabel).not.toHaveBeenCalled();
  });
});
