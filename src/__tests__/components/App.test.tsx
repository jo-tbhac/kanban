import React from 'react';
import { render } from '../../testUtils';

import { Main } from '../../components/App';
import { BoardState } from '../../store/board/types';

describe('<Main />', () => {
  let initialState: BoardState;
  beforeEach(() => {
    initialState = {
      isIndexVisible: true,
      selectedBoard: {
        id: 0,
        title: '',
        updatedAt: '',
        lists: [],
      },
    };
  });

  test('render <BoardIndex /> if state of `board.isIndexVisible` is true', () => {
    const { queryByTestId } = render(<Main />, { board: initialState });
    expect(queryByTestId('boardIndexComponent')).not.toBeNull();
    expect(queryByTestId('boardComponent')).toBeNull();
  });

  test('render <Board /> if state of `board.isIndexVisible` is false', () => {
    const state = { board: { ...initialState, isIndexVisible: false } };
    const { queryByTestId } = render(<Main />, state);
    expect(queryByTestId('boardIndexComponent')).toBeNull();
    expect(queryByTestId('boardComponent')).not.toBeNull();
  });
});
