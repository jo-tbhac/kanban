import React from 'react';

import { render, storeFactory, fireEvent } from '../../../testUtils';
import { mockCard } from '../../../utils/mockData';
import { Store } from '../../../store';
import { CardContext } from '../../../components/card/CardIndexContainer';
import { CreateCoverButton } from '../../../components/cover/CreateCoverButton';

describe('CreateCoverButton component', () => {
  let store: Store;
  let createCover: jest.Mock;
  let updateCover: jest.Mock;
  const fileId = 1;

  beforeEach(() => {
    store = storeFactory();
    createCover = jest.fn();
    updateCover = jest.fn();
  });

  test('should call `createCover` if `card` does not have `cover` upon click a component', () => {
    const card = { ...mockCard, cover: null };
    const { getByRole } = render(
      <CardContext.Provider value={card}>
        <CreateCoverButton createCover={createCover} updateCover={updateCover} fileId={fileId} />
      </CardContext.Provider>,
      store,
    );

    fireEvent.click(getByRole('button'));
    expect(createCover).toHaveBeenCalledWith(mockCard.listId, mockCard.id, fileId);
    expect(updateCover).not.toHaveBeenCalled();
  });

  test('should call `updateCover` if `card` has `cover` upon click a component', () => {
    const { getByRole } = render(
      <CardContext.Provider value={mockCard}>
        <CreateCoverButton createCover={createCover} updateCover={updateCover} fileId={fileId} />
      </CardContext.Provider>,
      store,
    );

    fireEvent.click(getByRole('button'));
    expect(updateCover).toHaveBeenCalledWith(mockCard.listId, mockCard.id, fileId);
    expect(createCover).not.toHaveBeenCalled();
  });
});
