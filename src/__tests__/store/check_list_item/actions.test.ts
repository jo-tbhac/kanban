import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { storeFactory } from '../../../testUtils';
import { mockCheckListItem, mockCheckList } from '../../../utils/mockData';
import { Store } from '../../../store';
import { dialogTypeError } from '../../../store/dialog/types';
import { failedCreateCheckListItem, failedUpdateCheckListItem } from '../../../utils/text';
import { createCheckListItem, toggleCheck } from '../../../store/check_list_item/actions';

describe('check list item actions', () => {
  let store: Store;
  let mock: MockAdapter;

  beforeEach(() => {
    store = storeFactory();
    mock = new MockAdapter(axios);
  });

  test('returns state `checkList.items` that added one record when an action of `createCheckListItem` was successful', () => {
    store = storeFactory({ checkList: { checkLists: [mockCheckList] } });
    const previousItems = store.getState().checkList.checkLists[0].items;
    const responseData = {
      check_list_item: { ...mockCheckListItem, checkListId: mockCheckList.id },
    };

    mock.onPost(`/check_list/${mockCheckList.id}/item`).reply(201, responseData);

    return store.dispatch(createCheckListItem(mockCheckListItem.name, mockCheckList.id) as any)
      .then(() => {
        const { checkList } = store.getState();
        const newItems = checkList.checkLists[0].items;
        expect(newItems).toHaveLength(previousItems.length + 1);
        expect(newItems[0]).toEqual(responseData.check_list_item);
      });
  });

  test('returns state of dialogProps upon dispatch an action `createCheckListItem` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };

    mock.onPost(`/check_list/${mockCheckList.id}/item`).reply(400, responseData);

    return store.dispatch(createCheckListItem(mockCheckListItem.name, mockCheckList.id) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedCreateCheckListItem);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state `checkList.items` that updated one record`s `check` value when an action `toggleCheck` was successful', () => {
    store = storeFactory({
      checkList: { checkLists: [{ ...mockCheckList, items: [mockCheckListItem] }] },
    });

    mock.onPatch(`/check_list_item/${mockCheckListItem.checkListId}/check`).reply(200);

    return (
      store.dispatch(toggleCheck(true, mockCheckListItem.id, mockCheckListItem.checkListId) as any)
        .then(() => {
          const { checkList } = store.getState();
          const targetItem = checkList.checkLists[0].items[0];
          expect(targetItem.check).toBeTruthy();
        })
    );
  });

  test('returns state of dialogProps upon dispatch an action `toggleCheck` and recieved status 400 from server', () => {
    store = storeFactory({
      checkList: { checkLists: [{ ...mockCheckList, items: [mockCheckListItem] }] },
    });
    const responseData = { errors: [{ text: 'some error...' }] };

    mock.onPatch(`/check_list_item/${mockCheckListItem.checkListId}/check`).reply(400, responseData);

    return (
      store.dispatch(toggleCheck(true, mockCheckListItem.id, mockCheckListItem.checkListId) as any)
        .then(() => {
          const { dialog, checkList } = store.getState();
          const targetItem = checkList.checkLists[0].items[0];
          expect(dialog.isDialogVisible).toBeTruthy();
          expect(dialog.type).toBe(dialogTypeError);
          expect(dialog.title).toBe(failedUpdateCheckListItem);
          expect(dialog.description).toBe('some error...');
          expect(targetItem.check).toBeFalsy();
        })
    );
  });
});
