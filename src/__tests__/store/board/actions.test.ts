import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { Store } from '../../../store';
import { dialogTypeError } from '../../../store/dialog/types';
import { storeFactory } from '../../../testUtils';
import { mockBoards, mockBoard } from '../../../utils/mockData';
import {
  failedFetchBoardData,
  failedCreateBoard,
  failedUpdateBoard,
  failedDeleteBoard,
  failedUpdateBackgroundImage,
} from '../../../utils/text';

import {
  fetchBoard,
  fetchAllBoards,
  createBoard,
  updateBoard,
  deleteBoard,
  updateBackgroundImage,
} from '../../../store/board/actions';

describe('board actions', () => {
  let store: Store;
  let mock: MockAdapter;

  beforeEach(() => {
    store = storeFactory();
    mock = new MockAdapter(axios);
  });

  test('returns state `selectedBoard` that recieved form server upon dispatch an action `fetchBoard` is successful', () => {
    const responseData = { board: mockBoard };
    const boardId = 1;
    mock.onGet(`/board/${boardId}`).reply(200, responseData);

    return store.dispatch(fetchBoard(boardId) as any)
      .then(() => {
        const { board } = store.getState();
        expect(board.selectedBoard).toEqual(mockBoard);
      });
  });

  test('returns state of dialogProps upon dispatch an action `fetchBoard` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    const boardId = 1;
    mock.onGet(`/board/${boardId}`).reply(400, responseData);

    return store.dispatch(fetchBoard(boardId) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedFetchBoardData);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state `boards` that recieved from server upon dispatch an action `fetchAllBoards` is successful', () => {
    const responseData = { boards: mockBoards };
    mock.onGet('/boards').reply(200, responseData);

    return store.dispatch(fetchAllBoards() as any)
      .then(() => {
        const { board } = store.getState();
        expect(board.boards).toEqual(mockBoards);
      });
  });

  test('returns state `boards` that added one record upon dispatch an action `createBoard` is successful', () => {
    const params = { name: 'sample board', backgroundImageId: 1 };
    const responseData = { board: mockBoard };
    mock.onPost('/board').reply(201, responseData);

    const previousState = store.getState().board;

    return store.dispatch(createBoard(params) as any)
      .then(() => {
        const { board } = store.getState();
        expect(board.boards.length).toBe(previousState.boards.length + 1);
        expect(board.selectedBoard).toEqual(mockBoard);
      });
  });

  test('returns state of dialogProps upon dispatch an action `createBoard` and recieved status 400 from server', () => {
    const params = { name: 'sample board', backgroundImageId: 1 };
    const responseData = { errors: [{ text: 'some error...' }] };
    mock.onPost('/board').reply(400, responseData);

    return store.dispatch(createBoard(params) as any)
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

    return store.dispatch(updateBoard(params, mockBoard.id) as any)
      .then(() => {
        const { board } = store.getState();
        expect(board.selectedBoard.name).toBe(params.name);
      });
  });

  test('returns state of dialogProps upon dispatch an action `updateBoard` and recieved status 400 from server', () => {
    const params = { name: 'sample board' };
    const responseData = { errors: [{ text: 'some error...' }] };
    mock.onPatch(`/board/${mockBoard.id}`).reply(400, responseData);

    return store.dispatch(updateBoard(params, mockBoard.id) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedUpdateBoard);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state `boards` that deleted one record upon dispatch an action `deleteBoard` is successful', () => {
    store = storeFactory({
      board: {
        boards: [
          { ...mockBoard, id: 1 },
          { ...mockBoard, id: 2 },
          { ...mockBoard, id: 3 },
        ],
      },
    });

    const previousState = store.getState().board;
    const boardId = 1;
    mock.onDelete(`/board/${boardId}`).reply(200);

    return store.dispatch(deleteBoard(boardId) as any)
      .then(() => {
        const { board } = store.getState();
        expect(board.boards).toHaveLength(previousState.boards.length - 1);
      });
  });

  test('returns state of dialogProps upon dispatch an action `deleteBoard` and recieved status 400 from server', () => {
    const boardId = 1;
    const responseData = { errors: [{ text: 'some error...' }] };

    mock.onDelete(`/board/${boardId}`).reply(400, responseData);

    return store.dispatch(deleteBoard(boardId) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedDeleteBoard);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state of `selectedBoard` that updated `backgroundImage` upon dispatch an action `updateBackgroundImage`', () => {
    const boardId = 1;
    const backgroundImageId = 2;

    store = storeFactory({
      board: {
        selectedBoard: {
          ...mockBoard,
          id: boardId,
          backgroundImage: { boardId, backgroundImageId: 3 },
        },
      },
    });

    mock.onPatch(`/board/${boardId}/background_image/${backgroundImageId}`).reply(200);

    return store.dispatch(updateBackgroundImage(boardId, backgroundImageId) as any)
      .then(() => {
        const { board } = store.getState();
        expect(board.selectedBoard.backgroundImage).toEqual({ boardId, backgroundImageId });
      });
  });

  test('returns state of dialogProps upon dispatch an action `updateBackgroundImage` and recieved status 400 from server', () => {
    const boardId = 1;
    const backgroundImageId = 2;
    const responseData = { errors: [{ text: 'some error...' }] };

    store = storeFactory({
      board: {
        selectedBoard: {
          ...mockBoard,
          id: boardId,
          backgroundImage: { boardId, backgroundImageId: 3 },
        },
      },
    });

    mock.onPatch(`/board/${boardId}/background_image/${backgroundImageId}`).reply(400, responseData);

    return store.dispatch(updateBackgroundImage(boardId, backgroundImageId) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedUpdateBackgroundImage);
        expect(dialog.description).toBe('some error...');
      });
  });
});
