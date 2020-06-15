import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import LabelIndex from '../../components/LabelIndex';

describe('<LabelIndex>', () => {
  let store: Store;
  beforeEach(() => {
    store = storeFactory();
  });

  test('should show `LabelEdit` when state of `isLabelEditVisible` is true', () => {
    const { getByTestId } = renderWithRouter(<LabelIndex />, store);
    fireEvent.click(getByTestId('addLabelButton'));

    expect(getByTestId('labelEdit')).toBeVisible();
  });

  test('should hide `LabelEdit` when state of `isLabelEditVisible` is false', () => {
    const { queryByTestId } = renderWithRouter(<LabelIndex />, store);
    expect(queryByTestId('labelEdit')).toBeNull();
  });
});
