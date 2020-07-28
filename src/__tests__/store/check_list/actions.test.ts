import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { storeFactory } from '../../../testUtils';
import { mockCheckLists, mockCheckList } from '../../../utils/mockData';
import { Store } from '../../../store';
import { dialogTypeError } from '../../../store/dialog/types';
import { failedCreateCheckList, failedUpdateCheckList, failedDeleteCheckList } from '../../../utils/text';
import {
  fetchCheckLists,
  createCheckList,
  updateCheckList,
  deleteCheckList,
} from '../../../store/check_list/actions';

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

  test('returns state of dialogProps upon dispatch an action `createCheckList` and recieved status 400 from server', () => {
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

  test('returns state `checkLists` that updated one record when an action of `updateCheckList` was successful', () => {
    store = storeFactory({ checkList: { checkLists: [mockCheckList] } });
    const title = 'vmwtnavo';

    mock.onPatch(`/check_list/${mockCheckList.id}`).reply(200);

    return store.dispatch(updateCheckList(mockCheckList.id, title) as any)
      .then(() => {
        const { checkList } = store.getState();
        const updatedCheckList = checkList.checkLists.find((c) => c.id === mockCheckList.id);
        expect(updatedCheckList?.title).toBe(title);
      });
  });

  test('returns state of dialogProps upon dispatch an action `updateCheckList` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    const title = 'jcie;aof';

    mock.onPatch(`/check_list/${mockCheckList.id}`).reply(400, responseData);

    return store.dispatch(updateCheckList(mockCheckList.id, title) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedUpdateCheckList);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state `checkLists` that deleted one record when an action of `deleteCheckList` was successful', () => {
    store = storeFactory({ checkList: { checkLists: [mockCheckList] } });
    const previousState = store.getState().checkList;

    mock.onDelete(`/check_list/${mockCheckList.id}`).reply(200);

    return store.dispatch(deleteCheckList(mockCheckList.id) as any)
      .then(() => {
        const { checkList } = store.getState();
        expect(checkList.checkLists).toHaveLength(previousState.checkLists.length - 1);
      });
  });

  test('returns state of dialogProps upon dispatch an action `deleteCheckList` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };

    mock.onDelete(`/check_list/${mockCheckList.id}`).reply(400, responseData);

    return store.dispatch(deleteCheckList(mockCheckList.id) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedDeleteCheckList);
        expect(dialog.description).toBe('some error...');
      });
  });
});
