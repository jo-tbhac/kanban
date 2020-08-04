import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import EditLabelButton from '../../../components/label/EditLabelButton';

describe('EditLabelButton component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should show `LabelEdit` if state of `isLabelEditVisible` is true', () => {
    const { getByRole, getByTestId } = renderWithRouter(<EditLabelButton />, store, ['/board/1']);
    fireEvent.click(getByRole('button'));

    expect(getByTestId('labelEdit')).toBeVisible();
  });

  test('should hide `LabelEdit` if state of `isLabelEditVisible` is false', () => {
    const { queryByTestId } = renderWithRouter(<EditLabelButton />, store, ['/board/1']);
    expect(queryByTestId('labelEdit')).toBeNull();
  });

  test('should not render a component if current location is not `/board/:boardId`', () => {
    const { queryByRole } = renderWithRouter(<EditLabelButton />, store, ['/']);
    expect(queryByRole('button')).toBeNull();
  });
});
