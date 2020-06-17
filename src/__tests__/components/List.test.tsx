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
});
