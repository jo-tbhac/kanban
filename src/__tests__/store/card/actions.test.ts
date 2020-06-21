import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { storeFactory } from '../../../testUtils';
import { mockCard, mockLists } from '../../../utils/mockData';
import { Store } from '../../../store';
import { dialogTypeError } from '../../../store/dialog/types';
import { failedCreateCard } from '../../../utils/text';
import { createCard } from '../../../store/card/actions';

describe('card actions', () => {
  let store: Store;
  let mock: MockAdapter;

  beforeEach(() => {
    store = storeFactory({ board: { selectedBoard: { lists: mockLists } } });
    mock = new MockAdapter(axios);
  });

  test('returns state of `selectedBoard.lists.cards` that added one record upon dispatch an action `createCard` is successful', () => {
    const listID = 1;
    const responseData = { card: mockCard };
    mock.onPost(`/list/${listID}/card`).reply(201, responseData);

    const previousState = store.getState().board;
    const previousList = previousState.selectedBoard.lists.find((list) => list.id === listID);

    if (previousList === undefined) {
      return expect(previousList).not.toBeUndefined();
    }

    return store.dispatch(createCard(listID, { title: mockCard.title }) as any)
      .then(() => {
        const { board } = store.getState();
        const targetList = board.selectedBoard.lists.find((list) => list.id === listID);

        if (targetList === undefined) {
          expect(targetList).not.toBeUndefined();
        } else {
          expect(targetList.cards.length).toBe(previousList.cards.length + 1);
          expect(targetList.cards[targetList.cards.length - 1]).toEqual(mockCard);
        }
      });
  });

  test('returns state of dialogProps upon dispatch an action `createCard` and recieved status 400 from server', () => {
    const listID = 1;
    const responseData = { errors: [{ text: 'some error...' }] };
    mock.onPost(`/list/${listID}/card`).reply(400, responseData);

    return store.dispatch(createCard(listID, { title: mockCard.title }) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedCreateCard);
        expect(dialog.description).toBe('some error...');
      });
  });
});