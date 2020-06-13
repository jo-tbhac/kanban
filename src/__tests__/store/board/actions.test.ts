import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { dialogTypeError } from '../../../store/dialog/types';
import { storeFactory } from '../../../testUtils';
import { mockBoards, mockBoard } from '../../../utils/mockData';
import { failedFetchBoardData, failedCreateBoard, failedUpdateBoard } from '../../../utils/text';
import {
  fetchBoard,
  fetchAllBoards,
  createBoard,
  updateBoard,
} from '../../../store/board/actions';

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

    return store.dispatch(fetchAllBoards())
      .then(() => {
        const { board } = store.getState();
        expect(board.boards).toEqual(mockBoards);
      });
  });

  test('returns state `boards` that added one record upon dispatch an action `createBoard` is successful', () => {
    const params = { name: 'sample board' };
    const responseData = { board: mockBoard };
    mock.onPost('/board').reply(201, responseData);

    const previousState = store.getState().board;

    return store.dispatch(createBoard(params))
      .then(() => {
        const { board } = store.getState();
        expect(board.boards.length).toBe(previousState.boards.length + 1);
        expect(board.selectedBoard).toEqual(mockBoard);
      });
  });

  test('returns state of dialogProps upon dispatch an action `createBoard` and recieved status 400 from server', () => {
    const params = { name: 'sample board' };
    const responseData = { errors: [{ text: 'some error...' }] };
    mock.onPost('/board').reply(400, responseData);

    return store.dispatch(createBoard(params))
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedCreateBoard);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state `selectedBoard` that updated name upon dispatch an action `updateBoard` is successful', () => {
    const params = { name: 'sample board' };
    const responseData = { board: params };
    mock.onPatch(`/board/${mockBoard.id}`).reply(200, responseData);

    return store.dispatch(updateBoard(params, mockBoard.id))
      .then(() => {
        const { board } = store.getState();
        expect(board.selectedBoard.name).toBe(params.name);
      });
  });

  test('returns state of dialogProps upon dispatch an action `updateBoard` and recieved status 400 from server', () => {
    const params = { name: 'sample board' };
    const responseData = { errors: [{ text: 'some error...' }] };
    mock.onPatch(`/board/${mockBoard.id}`).reply(400, responseData);

    return store.dispatch(updateBoard(params, mockBoard.id))
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedUpdateBoard);
        expect(dialog.description).toBe('some error...');
      });
  });
});
