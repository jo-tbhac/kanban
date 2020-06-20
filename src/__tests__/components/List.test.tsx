import React from 'react';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { mockList } from '../../utils/mockData';
import List from '../../components/List';

describe('<List>', () => {
  let store: Store;
  beforeEach(() => {
    store = storeFactory();
  });

  test('should show `ListNameForm` when state of `isListFormVisible` is true', () => {
    const { queryByTestId, getByTestId } = render(<List list={mockList} />, store);
    fireEvent.click(getByTestId('listName'));

    expect(queryByTestId('listName')).toBeNull();
    expect(getByTestId('listNameForm')).toBeVisible();
  });

  test('should hide `ListNameForm` when state of `isListFormVisible` is false', () => {
    const { queryByTestId, getByTestId } = render(<List list={mockList} />, store);

    expect(queryByTestId('listNameForm')).toBeNull();
    expect(getByTestId('listName')).toBeVisible();
  });

  test('should show `ListMenu` when state of `isListMenuVisible` is true', () => {
    const { getByTestId } = render(<List list={mockList} />, store);
    fireEvent.click(getByTestId('listMenuButton'));

    expect(getByTestId('listMenu')).toBeVisible();
  });

  test('should hide `ListMenu` when state of `isListMenuVisible` is false', () => {
    const { queryByTestId } = render(<List list={mockList} />, store);
    expect(queryByTestId('listMenu')).toBeNull();
  });

  test('should show `CardForm` when state of `isCardFormVisible` is true', () => {
    const { getByTestId } = render(<List list={mockList} />, store);
    fireEvent.click(getByTestId('addCardButton'));
    expect(getByTestId('cardForm')).toBeVisible();
  });

  test('should hide `CardForm` when state of `isCardFormVisible` is false', () => {
    const { queryByTestId } = render(<List list={mockList} />, store);
    expect(queryByTestId('cardForm')).toBeNull();
  });
});
