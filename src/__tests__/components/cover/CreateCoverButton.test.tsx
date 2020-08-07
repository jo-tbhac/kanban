import React from 'react';

import { render, storeFactory, fireEvent } from '../../../testUtils';
import { mockCard } from '../../../utils/mockData';
import { Store } from '../../../store';
import { CardContext } from '../../../components/card/CardIndexContainer';
import { CreateCoverButton } from '../../../components/cover/CreateCoverButton';

describe('CreateCoverButton component', () => {
  let store: Store;
  let createCover: jest.Mock;
  const fileId = 1;

  beforeEach(() => {
    store = storeFactory();
    createCover = jest.fn();
  });

  test('should call `createCover` upon click a component', () => {
    const { getByRole } = render(
      <CardContext.Provider value={mockCard}>
        <CreateCoverButton createCover={createCover} fileId={fileId} />
      </CardContext.Provider>,
      store,
    );

    fireEvent.click(getByRole('button'));
    expect(createCover).toHaveBeenCalledWith(mockCard.listId, mockCard.id, fileId);
  });
});
