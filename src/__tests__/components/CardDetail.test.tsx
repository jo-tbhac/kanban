import React from 'react';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { mockCard } from '../../utils/mockData';
import CardDetail from '../../components/CardDetail';

describe('CardDetail component', () => {
  let store: Store;
  let setCardDetailVisible: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    setCardDetailVisible = jest.fn();
  });

  test('should call `setCardDetailVisible` with `false` when clicked a close button', () => {
    const { getByTestId } = render(
      <CardDetail card={mockCard} setCardDetailVisible={setCardDetailVisible} />,
      store,
    );

    fireEvent.click(getByTestId('cardDetailCloseButton'));
    expect(setCardDetailVisible).toHaveBeenCalledWith(false);
  });

  test('should call `setCardDetailVisible` with `false` when clicked overlay', () => {
    const { getByTestId } = render(
      <CardDetail card={mockCard} setCardDetailVisible={setCardDetailVisible} />,
      store,
    );

    fireEvent.click(getByTestId('cardDetail'));
    expect(setCardDetailVisible).toHaveBeenCalledWith(false);
  });
});
