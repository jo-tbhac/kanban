import React from 'react';
import { render, fireEvent, storeFactory } from '../../testUtils';

import Header from '../../components/Header';

describe('<Header />', () => {
  test('update state of `board.isIndexVisible` to `true` when click a home icon', () => {
    const initialState = { board: { isIndexVisible: false } };
    const store = storeFactory(initialState);
    const { getByTestId } = render(<Header />, store);

    fireEvent.click(getByTestId('homeIcon'));

    const newState = store.getState().board;
    expect(newState.isIndexVisible).toBe(true);
  });
});
