import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { mockCard, mockFile } from '../../../utils/mockData';
import { Store } from '../../../store';
import CardContext from '../../../context/CardContext';
import { CardDetail } from '../../../components/card/CardDetail';

describe('CardDetail component', () => {
  let store: Store;
  let closeCardDetail: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    closeCardDetail = jest.fn();
  });

  test('should call `closeCardDetail` when clicked a close button', () => {
    const { getByTestId } = render(
      <CardDetail closeCardDetail={closeCardDetail} />,
      store,
    );

    fireEvent.click(getByTestId('cardDetailCloseButton'));
    expect(closeCardDetail).toHaveBeenCalled();
  });

  test('should call `closeCardDetail` when clicked overlay', () => {
    const { getByTestId } = render(
      <CardDetail closeCardDetail={closeCardDetail} />,
      store,
    );

    fireEvent.click(getByTestId('cardDetail'));
    expect(closeCardDetail).toHaveBeenCalled();
  });

  test('should render a cover', () => {
    store = storeFactory({
      file: {
        files: [{ ...mockFile, id: mockCard.cover.fileId, cardId: mockCard.id }],
      },
    });

    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardDetail closeCardDetail={closeCardDetail} />
      </CardContext.Provider>,
      store,
    );

    expect(getByTestId('cover')).not.toBeNull();
  });

  test('should not render a cover if `card` does not contain `cover`', () => {
    const card = { ...mockCard, cover: null };

    const { queryByTestId } = render(
      <CardContext.Provider value={card}>
        <CardDetail closeCardDetail={closeCardDetail} />
      </CardContext.Provider>,
      store,
    );

    expect(queryByTestId('cover')).toBeNull();
  });
});
