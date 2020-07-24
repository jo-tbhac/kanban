import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { storeFactory } from '../../../testUtils';
import { mockCheckLists, mockCheckList } from '../../../utils/mockData';
import { Store } from '../../../store';
import { dialogTypeError } from '../../../store/dialog/types';
import { failedCreateCheckList } from '../../../utils/text';
import { fetchCheckLists, createCheckList } from '../../../store/check_list/actions';

describe('check list actions', () => {
  let store: Store;
  let mock: MockAdapter;

  beforeEach(() => {
    store = storeFactory();
    mock = new MockAdapter(axios);
  });

  test('returns state `checkLists` that recieved from server when an action of `fetchCheckLists` was successful', () => {
    const responseData = { check_lists: mockCheckLists };
    const boardId = 1;

    mock.onGet(`/board/${boardId}/check_lists`).reply(200, responseData);

    return store.dispatch(fetchCheckLists(boardId) as any)
      .then(() => {
        const { checkList } = store.getState();
        expect(checkList.checkLists).toEqual(mockCheckLists);
      });
  });

  test('returns state `checkLists` that added one record when an action of `createCheckList` was successful', () => {
    const responseData = { check_list: mockCheckList };
    const previousState = store.getState().checkList;

    mock.onPost(`card/${mockCheckList.cardId}/check_list`).reply(201, responseData);

    return store.dispatch(createCheckList(mockCheckList.title, mockCheckList.cardId) as any)
      .then(() => {
        const { checkList } = store.getState();
        expect(checkList.checkLists[0]).toEqual(mockCheckList);
        expect(checkList.checkLists.length).toBe(previousState.checkLists.length + 1);
      });
  });

  test('returns state of dialogProps upon dispatch an action `fetchCheckLists` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    const cardId = 1;
    const title = 'jcie;aof';

    mock.onPost(`card/${cardId}/check_list`).reply(400, responseData);

    return store.dispatch(createCheckList(title, cardId) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedCreateCheckList);
        expect(dialog.description).toBe('some error...');
      });
  });
});
