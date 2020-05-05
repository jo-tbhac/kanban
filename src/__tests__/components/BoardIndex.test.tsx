import React from 'react';
import { render, fireEvent, storeFactory } from '../../testUtils';

import BoardIndex from '../../components/BoardIndex';

describe('<BoardIndex />', () => {
  test('update state of `board.isIndexVisible` to `false` when click a board index card', () => {
    const store = storeFactory();
    const { getAllByTestId } = render(<BoardIndex />, store);
    fireEvent.click(getAllByTestId('boardIndexCard')[0]);
    const newState = store.getState().board;
    expect(newState.isIndexVisible).toBe(false);
  });
});
