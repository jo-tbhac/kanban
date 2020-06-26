import React from 'react';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { mockCard } from '../../utils/mockData';
import { CardSideBarDeleteButton } from '../../components/CardSideBarDeleteButton';
import { CardContext } from '../../components/List';

describe('CardSideBarDeleteButton component', () => {
  let store: Store;
  let openDialog: jest.Mock;
  let deleteCard: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    openDialog = jest.fn();
    deleteCard = jest.fn();
  });

  test('should call `openDialog` when clicked the delete card button', () => {
    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardSideBarDeleteButton openDialog={openDialog} deleteCard={deleteCard} />
      </CardContext.Provider>,
      store,
    );

    fireEvent.click(getByTestId('cardSideBarDeleteButton'));
    expect(openDialog).toHaveBeenCalled();
  });
});
