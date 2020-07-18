import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import {
  render,
  fireEvent,
  storeFactory,
  act,
} from '../../../testUtils';

import { Store } from '../../../store';
import { mockCard } from '../../../utils/mockData';
import { Card } from '../../../components/card/Card';
import { CardContext } from '../../../components/card/CardIndexContainer';

describe('Card component', () => {
  let store: Store;
  let selectedLabelIds: number[];
  let moveCard: jest.Mock;
  let moveCardAcrossList: jest.Mock;
  let updateCardIndex: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    selectedLabelIds = [];
    moveCard = jest.fn();
    moveCardAcrossList = jest.fn();
    updateCardIndex = jest.fn();
  });

  test('should show `CardDetail` if state of `isCardDetailVisible` is true', () => {
    const { getByTestId } = render(
      <DndProvider backend={HTML5Backend}>
        <CardContext.Provider value={mockCard}>
          <Card
            selectedLabelIds={selectedLabelIds}
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
            selectedLabelIds={selectedLabelIds}
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
            selectedLabelIds={selectedLabelIds}
            moveCard={moveCard}
            moveCardAcrossList={moveCardAcrossList}
            updateCardIndex={updateCardIndex}
          />
        </CardContext.Provider>
        <CardContext.Provider value={mockCard2}>
          <Card
            selectedLabelIds={selectedLabelIds}
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
            selectedLabelIds={selectedLabelIds}
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

  test('should have a style of `opacity: 0.2` when card is dragging', async () => {
    const { getByTestId } = render(
      <DndProvider backend={HTML5Backend}>
        <CardContext.Provider value={mockCard}>
          <Card
            selectedLabelIds={selectedLabelIds}
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
    });

    expect(getByTestId(`card-${mockCard.id}`)).toHaveStyle('opacity: 0.2');
  });

  test('should have a style of `opacity: 1` if props of `selectedLabelIds.length` is zero', () => {
    const { getByTestId } = render(
      <DndProvider backend={HTML5Backend}>
        <CardContext.Provider value={mockCard}>
          <Card
            selectedLabelIds={selectedLabelIds}
            moveCard={moveCard}
            moveCardAcrossList={moveCardAcrossList}
            updateCardIndex={updateCardIndex}
          />
        </CardContext.Provider>
      </DndProvider>,
      store,
    );

    expect(getByTestId(`card-${mockCard.id}`)).toHaveStyle('opacity: 1');
  });

  test('should have a style of `opacity: 1` if props of `selectedLabelIds` includes label ids that attached to a card', () => {
    const targetLabelId = 1;
    const targetCard = { ...mockCard, labels: [{ id: targetLabelId }] };
    selectedLabelIds = [targetLabelId];

    const { getByTestId } = render(
      <DndProvider backend={HTML5Backend}>
        <CardContext.Provider value={targetCard}>
          <Card
            selectedLabelIds={selectedLabelIds}
            moveCard={moveCard}
            moveCardAcrossList={moveCardAcrossList}
            updateCardIndex={updateCardIndex}
          />
        </CardContext.Provider>
      </DndProvider>,
      store,
    );

    expect(getByTestId(`card-${targetCard.id}`)).toHaveStyle('opacity: 1');
  });

  test('should have a style of `opacity: 0.4` if props of `selectedLabelIds` does not include label ids that attached to a card', () => {
    const targetCard = { ...mockCard, labels: [{ id: 1 }] };
    selectedLabelIds = [2];

    const { getByTestId } = render(
      <DndProvider backend={HTML5Backend}>
        <CardContext.Provider value={targetCard}>
          <Card
            selectedLabelIds={selectedLabelIds}
            moveCard={moveCard}
            moveCardAcrossList={moveCardAcrossList}
            updateCardIndex={updateCardIndex}
          />
        </CardContext.Provider>
      </DndProvider>,
      store,
    );

    expect(getByTestId(`card-${targetCard.id}`)).toHaveStyle('opacity: 0.4');
  });
});
