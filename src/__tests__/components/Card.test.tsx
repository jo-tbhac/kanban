import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import {
  render,
  fireEvent,
  storeFactory,
  act,
} from '../../testUtils';

import { Store } from '../../store';
import { mockCard } from '../../utils/mockData';
import { Card } from '../../components/Card';
import { CardContext } from '../../components/CardIndexContainer';

describe('Card component', () => {
  let store: Store;
  let moveCard: jest.Mock;
  let moveCardAcrossList: jest.Mock;
  let updateCardIndex: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    moveCard = jest.fn();
    moveCardAcrossList = jest.fn();
    updateCardIndex = jest.fn();
  });

  test('should show `CardDetail` if state of `isCardDetailVisible` is true', () => {
    const { getByTestId } = render(
      <DndProvider backend={HTML5Backend}>
        <CardContext.Provider value={mockCard}>
          <Card
            moveCard={moveCard}
            moveCardAcrossList={moveCardAcrossList}
            updateCardIndex={updateCardIndex}
          />
        </CardContext.Provider>
      </DndProvider>,
      store,
    );
    fireEvent.click(getByTestId(`card-${mockCard.id}`));

    expect(getByTestId('cardDetail')).toBeVisible();
  });

  test('should hide `CardDetail` if state of `isCardDetailVisible` is false', () => {
    const { queryByTestId } = render(
      <DndProvider backend={HTML5Backend}>
        <CardContext.Provider value={mockCard}>
          <Card
            moveCard={moveCard}
            moveCardAcrossList={moveCardAcrossList}
            updateCardIndex={updateCardIndex}
          />
        </CardContext.Provider>
      </DndProvider>,
      store,
    );
    expect(queryByTestId('cardDetail')).toBeNull();
  });

  test('should call `moveCard` when drag item was entered', async () => {
    const mockCard2 = { ...mockCard, id: 2, index: 1 };
    const { getByTestId } = render(
      <DndProvider backend={HTML5Backend}>
        <CardContext.Provider value={mockCard}>
          <Card
            moveCard={moveCard}
            moveCardAcrossList={moveCardAcrossList}
            updateCardIndex={updateCardIndex}
          />
        </CardContext.Provider>
        <CardContext.Provider value={mockCard2}>
          <Card
            moveCard={moveCard}
            moveCardAcrossList={moveCardAcrossList}
            updateCardIndex={updateCardIndex}
          />
        </CardContext.Provider>
      </DndProvider>,
      store,
    );

    await act(async () => {
      fireEvent.dragStart(getByTestId(`card-${mockCard.id}`));
      fireEvent.dragEnter(getByTestId(`card-${mockCard2.id}`));
    });

    expect(moveCard).toHaveBeenCalledWith({
      dragId: mockCard.id,
      dropId: mockCard2.id,
      listId: mockCard.listId,
    });
  });

  test('should call `updateCardIndex` when drag was end', () => {
    const { getByTestId } = render(
      <DndProvider backend={HTML5Backend}>
        <CardContext.Provider value={mockCard}>
          <Card
            moveCard={moveCard}
            moveCardAcrossList={moveCardAcrossList}
            updateCardIndex={updateCardIndex}
          />
        </CardContext.Provider>
      </DndProvider>,
      store,
    );

    fireEvent.dragStart(getByTestId(`card-${mockCard.id}`));
    fireEvent.dragEnd(getByTestId(`card-${mockCard.id}`));
    expect(updateCardIndex).toHaveBeenCalled();
  });
});
