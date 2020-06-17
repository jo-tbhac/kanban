import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { storeFactory } from '../../../testUtils';
import { mockList } from '../../../utils/mockData';
import { Store } from '../../../store';
import { dialogTypeError } from '../../../store/dialog/types';
import { failedCreateList } from '../../../utils/text';
import { createList } from '../../../store/list/actions';

describe('list actions', () => {
  let store: Store;
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = storeFactory();
  });

  test('returns state of `selectedBoard.lists` that added one record upon dispatch an action `createList` is successful', () => {
    const boardID = 1;
    const responseData = { list: mockList };
    mock.onPost(`/board/${boardID}/list`).reply(201, responseData);

    const previousState = store.getState().board;

    return store.dispatch(createList(boardID, { name: mockList.name }) as any)
      .then(() => {
        const { board } = store.getState();
        const listsLength = board.selectedBoard.lists.length;
        expect(listsLength).toBe(previousState.selectedBoard.lists.length + 1);
        expect(board.selectedBoard.lists[listsLength - 1]).toEqual(mockList);
      });
  });

  test('returns state of dialogProps upon dispatch an action `createList` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    const boardID = 1;
    mock.onPost(`/board/${boardID}/list`).reply(400, responseData);

    return store.dispatch(createList(boardID, { name: mockList.name }) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedCreateList);
        expect(dialog.description).toBe('some error...');
      });
  });
});
