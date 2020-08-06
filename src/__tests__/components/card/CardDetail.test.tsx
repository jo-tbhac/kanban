import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { mockCard, mockFile } from '../../../utils/mockData';
import { Store } from '../../../store';
import { CardContext } from '../../../components/card/CardIndexContainer';
import CardDetail from '../../../components/card/CardDetail';

describe('CardDetail component', () => {
  let store: Store;
  let setCardDetailVisible: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    setCardDetailVisible = jest.fn();
  });

  test('should call `setCardDetailVisible` with `false` when clicked a close button', () => {
    const { getByTestId } = render(
      <CardDetail setCardDetailVisible={setCardDetailVisible} />,
      store,
    );

    fireEvent.click(getByTestId('cardDetailCloseButton'));
    expect(setCardDetailVisible).toHaveBeenCalledWith(false);
  });

  test('should call `setCardDetailVisible` with `false` when clicked overlay', () => {
    const { getByTestId } = render(
      <CardDetail setCardDetailVisible={setCardDetailVisible} />,
      store,
    );

    fireEvent.click(getByTestId('cardDetail'));
    expect(setCardDetailVisible).toHaveBeenCalledWith(false);
  });

  test('should render a cover', () => {
    store = storeFactory({
      file: {
        files: [{ ...mockFile, id: mockCard.cover.fileId, cardId: mockCard.id }],
      },
    });

    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardDetail setCardDetailVisible={setCardDetailVisible} />
      </CardContext.Provider>,
      store,
    );

    expect(getByTestId('cover')).not.toBeNull();
  });

  test('should not render a cover if `card` does not contain `cover`', () => {
    const card = { ...mockCard, cover: null };

    const { queryByTestId } = render(
      <CardContext.Provider value={card}>
        <CardDetail setCardDetailVisible={setCardDetailVisible} />
      </CardContext.Provider>,
      store,
    );

    expect(queryByTestId('cover')).toBeNull();
  });
});
