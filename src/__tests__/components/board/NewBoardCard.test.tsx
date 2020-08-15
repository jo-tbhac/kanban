import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import NewBoardCard from '../../../components/board/NewBoardCard';

describe('NewBoardCard component', () => {
  let store: Store;
  let showForm: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    showForm = jest.fn();
  });

  test('should call `showForm` upon click a component', () => {
    const { getByTestId } = render(<NewBoardCard showForm={showForm} />, store);
    fireEvent.click(getByTestId('newBoardCard'));
    expect(showForm).toHaveBeenCalled();
  });
});
