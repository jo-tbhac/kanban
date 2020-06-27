import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import LabelEdit from '../../components/LabelEdit';

describe('LabelEdit component', () => {
  let store: Store;
  beforeEach(() => {
    store = storeFactory();
  });

  test('should show `LabelForm` when clicked an add label button', () => {
    const setLabelEditVisible = jest.fn();
    const { getByTestId, queryByTestId } = renderWithRouter(
      <LabelEdit setLabelEditVisible={setLabelEditVisible} />,
      store,
    );

    fireEvent.click(getByTestId('newLabelButton'));
    expect(getByTestId('labelForm')).toBeVisible();
    expect(queryByTestId('newLabelButton')).toBeNull();
  });

  test('should hide `LabelForm` when state of `isLabelFormVisible` is false', () => {
    const setLabelEditVisible = jest.fn();
    const { getByTestId, queryByTestId } = renderWithRouter(
      <LabelEdit setLabelEditVisible={setLabelEditVisible} />,
      store,
    );

    expect(getByTestId('newLabelButton')).toBeVisible();
    expect(queryByTestId('labelForm')).toBeNull();
  });
});
