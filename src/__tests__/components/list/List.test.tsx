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
import { mockList } from '../../../utils/mockData';
import { List } from '../../../components/list/List';

describe('List component', () => {
  let store: Store;
  let moveList: jest.Mock;
  let updateListIndex: jest.Mock;
  let scrollTo: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    moveList = jest.fn();
    updateListIndex = jest.fn();
    scrollTo = jest.fn();
    (global as any).HTMLDivElement.prototype.scrollTo = scrollTo;
  });

  test('should show `CardForm` if state of `isCardFormVisible` is true', () => {
    const { getByTestId } = render(
      <DndProvider backend={HTML5Backend}>
        <List list={mockList} moveList={moveList} updateListIndex={updateListIndex} />
      </DndProvider>,
      store,
    );
    fireEvent.click(getByTestId('addCardButton'));
    expect(getByTestId('cardForm')).toBeVisible();
    expect(scrollTo).toHaveBeenCalled();
  });

  test('should hide `CardForm` if state of `isCardFormVisible` is false', () => {
    const { queryByTestId } = render(
      <DndProvider backend={HTML5Backend}>
        <List list={mockList} moveList={moveList} updateListIndex={updateListIndex} />
      </DndProvider>,
      store,
    );
    expect(queryByTestId('cardForm')).toBeNull();
  });

  test('should call `updateListIndex` when drag was end', () => {
    const { getByTestId } = render(
      <DndProvider backend={HTML5Backend}>
        <List list={mockList} moveList={moveList} updateListIndex={updateListIndex} />
      </DndProvider>,
      store,
    );

    fireEvent.dragStart(getByTestId(`list-${mockList.id}`));
    fireEvent.dragEnd(getByTestId(`list-${mockList.id}`));
    expect(updateListIndex).toHaveBeenCalled();
  });

  test('should call `moveCard` when drag item was entered', async () => {
    const list1 = { ...mockList, id: 1, index: 0 };
    const list2 = { ...mockList, id: 2, index: 1 };
    const { getByTestId } = render(
      <DndProvider backend={HTML5Backend}>
        <List list={list1} moveList={moveList} updateListIndex={updateListIndex} />
        <List list={list2} moveList={moveList} updateListIndex={updateListIndex} />
      </DndProvider>,
      store,
    );

    await act(async () => {
      fireEvent.dragStart(getByTestId(`list-${list1.id}`));
      fireEvent.dragEnter(getByTestId(`list-${list2.id}`));
    });

    expect(moveList).toHaveBeenCalled();
  });
});
