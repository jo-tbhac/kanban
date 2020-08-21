import React from 'react';

import { render, storeFactory, fireEvent } from '../../../testUtils';
import { mockCard } from '../../../utils/mockData';
import { Store } from '../../../store';
import CardContext from '../../../context/CardContext';
import { DeleteCoverButton } from '../../../components/cover/DeleteCoverButton';

describe('DeleteCoverButton component', () => {
  let store: Store;
  let deleteCover: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    deleteCover = jest.fn();
  });

  test('should call `deleteCover` upon click a component', () => {
    const { getByRole } = render(
      <CardContext.Provider value={mockCard}>
        <DeleteCoverButton deleteCover={deleteCover} />
      </CardContext.Provider>,
      store,
    );

    fireEvent.click(getByRole('button'));
    expect(deleteCover).toHaveBeenCalledWith(mockCard.listId, mockCard.id);
  });
});
