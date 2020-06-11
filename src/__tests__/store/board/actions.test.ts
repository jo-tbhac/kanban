import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { fetchBoard, fetchAllBoards } from '../../../store/board/actions';
import { dialogTypeError } from '../../../store/dialog/types';
import { storeFactory } from '../../../testUtils';
import { mockBoards, mockBoard } from '../../../utils/mockData';
import { failedFetchBoardData } from '../../../utils/text';

describe('board actions', () => {
  let store: any;
  let mock: MockAdapter;

  beforeEach(() => {
    store = storeFactory();
    mock = new MockAdapter(axios);
  });

  test('returns state `selectedBoard` that recieved form server upon dispatch an action `fetchBoard` is successful', () => {
    const responseData = { board: mockBoard };
    const boardId = 1;
    mock.onGet(`/board/${boardId}`).reply(200, responseData);

    return store.dispatch(fetchBoard(boardId))
      .then(() => {
        const { board } = store.getState();
        expect(board.selectedBoard).toEqual(mockBoard);
      });
  });

  test('returns state of dialogProps upon dispatch an action `fetchBoard` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    const boardId = 1;
    mock.onGet(`/board/${boardId}`).reply(400, responseData);

    return store.dispatch(fetchBoard(boardId))
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedFetchBoardData);
        expect(dialog.description).toBe('some error...');
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
