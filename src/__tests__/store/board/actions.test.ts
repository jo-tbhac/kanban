import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { SHOW_BOARD_INDEX } from '../../../store/board/types';
import { showBoard, showBoardIndex, fetchAllBoards } from '../../../store/board/actions';
import { storeFactory } from '../../../testUtils';
import dataStore from '../../../tmp_dataStore';
import { mockBoards } from '../../../utils/mockData';

describe('board actions', () => {
  let store: any;
  let mock: MockAdapter;

  beforeEach(() => {
    store = storeFactory();
    mock = new MockAdapter(axios);
  });

  test('returns an action with type `SHOW_BOARD_INDEX`', () => {
    const action = showBoardIndex();
    expect(action).toEqual({ type: SHOW_BOARD_INDEX });
  });

  test('returns an action with payload and type `SHOW_BOARD`', () => (
    store.dispatch(showBoard())
      .then(() => {
        const { board } = store.getState();
        expect(board.isIndexVisible).toBe(false);
        expect(board.selectedBoard).toEqual(dataStore[0]);
      })
  ));

  test('returns state `boards` that recieved form server upon dispatch an action `fetchAllBoards` is successful', () => {
    const responseData = { boards: mockBoards };
    mock.onGet('/boards').reply(200, responseData);

    store.dispatch(fetchAllBoards())
      .then(() => {
        const { board } = store.getState();
        expect(board.boards).toEqual(mockBoards);
      });
  });

  test('returns state `boards` that recieved form server upon dispatch an action `fetchAllBoards` is successful', () => {
    const responseData = { boards: mockBoards };
    mock.onGet('/boards').reply(200, responseData);

    store.dispatch(fetchAllBoards())
      .then(() => {
        const { board } = store.getState();
        expect(board.boards).toEqual(mockBoards);
      });
  });
});
