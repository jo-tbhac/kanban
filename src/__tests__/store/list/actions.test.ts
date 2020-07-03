import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { storeFactory } from '../../../testUtils';
import { mockList, mockLists } from '../../../utils/mockData';
import { Store } from '../../../store';
import { dialogTypeError } from '../../../store/dialog/types';
import { MOVE_LIST } from '../../../store/list/types';
import {
  failedCreateList,
  failedUpdateList,
  failedDeleteList,
  failedUpdateListIndex,
} from '../../../utils/text';

import {
  createList,
  updateList,
  deleteList,
  moveList,
  updateListIndex,
} from '../../../store/list/actions';

describe('list actions', () => {
  let store: Store;
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = storeFactory();
  });

  test('returns state of `selectedBoard.lists` that added one record upon dispatch an action `createList` is successful', () => {
    const boardId = 1;
    const responseData = { list: mockList };
    mock.onPost(`/board/${boardId}/list`).reply(201, responseData);

    const previousState = store.getState().board;

    return store.dispatch(createList(boardId, { name: mockList.name }) as any)
      .then(() => {
        const { board } = store.getState();
        const listsLength = board.selectedBoard.lists.length;
        expect(listsLength).toBe(previousState.selectedBoard.lists.length + 1);
        expect(board.selectedBoard.lists[listsLength - 1]).toEqual(mockList);
      });
  });

  test('returns state of dialogProps upon dispatch an action `createList` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    const boardId = 1;
    mock.onPost(`/board/${boardId}/list`).reply(400, responseData);

    return store.dispatch(createList(boardId, { name: mockList.name }) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedCreateList);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state of `selectedBoard.lists` that updated one record upon dispatch an action `updateList` is successful', () => {
    store = storeFactory({ board: { selectedBoard: { lists: mockLists } } });
    const listId = 1;
    const params = { name: 'updated list' };
    const responseData = { list: { ...mockList, ...params } };
    mock.onPatch(`/list/${listId}`).reply(200, responseData);

    return store.dispatch(updateList(listId, params) as any)
      .then(() => {
        const { board } = store.getState();
        const updatedList = board.selectedBoard.lists.find((list) => list.id === listId);
        expect(updatedList).toEqual({ ...mockList, ...params });
      });
  });

  test('returns state of dialogProps upon dispatch an action `updateList` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    const listId = 1;
    mock.onPatch(`/list/${listId}`).reply(400, responseData);

    return store.dispatch(updateList(listId, { name: 'updated list' }) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedUpdateList);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state of `selectedBoard.lists` that deleted onerecord upon dispatch an action `deleteList` is successful', () => {
    store = storeFactory({ board: { selectedBoard: { lists: mockLists } } });
    const listId = 1;
    mock.onDelete(`/list/${listId}`).reply(200);

    const previousState = store.getState().board;

    return store.dispatch(deleteList(listId) as any)
      .then(() => {
        const { board } = store.getState();
        expect(board.selectedBoard.lists.length).toBe(previousState.selectedBoard.lists.length - 1);
      });
  });

  test('returns state of dialogProps upon dispatch an action `deleteList` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    const listId = 1;
    mock.onDelete(`/list/${listId}`).reply(400, responseData);

    return store.dispatch(deleteList(listId) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedDeleteList);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns action with payload and type `MOVE_LIST`', () => {
    const payload = { dragId: 1, dropId: 2 };
    const action = moveList(payload);
    expect(action).toEqual({ type: MOVE_LIST, payload });
  });

  test('returns state of dialogProps upon dispatch an action `updateListIndex` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    mock.onPatch('/lists/index').reply(400, responseData);

    return store.dispatch(updateListIndex() as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedUpdateListIndex);
        expect(dialog.description).toBe('some error...');
      });
  });
});
