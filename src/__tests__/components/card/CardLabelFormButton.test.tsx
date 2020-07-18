import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import CardLabelFormButton from '../../../components/card/CardLabelFormButton';

describe('CardLabelFormButton component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should show `CardLabelForm` if state of `isCardLabelFormVisible` is true', () => {
    const { getByTestId } = render(<CardLabelFormButton />, store);
    fireEvent.click(getByTestId('cardLabelFormButton'));

    expect(getByTestId('cardLabelForm')).toBeVisible();
  });

  test('should hide `CardLabelForm` if state of `isCardLabelFormVisible` is false', () => {
    const { queryByTestId } = render(<CardLabelFormButton />, store);
    expect(queryByTestId('cardLabelForm')).toBeNull();
  });
});
