import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { storeFactory } from '../../../testUtils';
import { mockCard, mockListsWithCard } from '../../../utils/mockData';
import { Store } from '../../../store';
import { dialogTypeError } from '../../../store/dialog/types';
import { failedCreateCard, failedUpdateCard, failedDeleteCard } from '../../../utils/text';
import { createCard, updateCard, deleteCard } from '../../../store/card/actions';

describe('card actions', () => {
  let store: Store;
  let mock: MockAdapter;

  beforeEach(() => {
    store = storeFactory({ board: { selectedBoard: { lists: mockListsWithCard } } });
    mock = new MockAdapter(axios);
  });

  test('returns state of `selectedBoard.lists.cards` that added one record upon dispatch an action `createCard` is successful', () => {
    const listId = 1;
    const responseData = { card: mockCard };
    mock.onPost(`/list/${listId}/card`).reply(201, responseData);

    const previousState = store.getState().board;
    const previousList = previousState.selectedBoard.lists.find((list) => list.id === listId);

    if (previousList === undefined) {
      return expect(previousList).not.toBeUndefined();
    }

    return store.dispatch(createCard(listId, { title: mockCard.title }) as any)
      .then(() => {
        const { board } = store.getState();
        const targetList = board.selectedBoard.lists.find((list) => list.id === listId);

        if (targetList === undefined) {
          expect(targetList).not.toBeUndefined();
        } else {
          expect(targetList.cards.length).toBe(previousList.cards.length + 1);
          expect(targetList.cards[targetList.cards.length - 1]).toEqual(mockCard);
        }
      });
  });

  test('returns state of dialogProps upon dispatch an action `createCard` and recieved status 400 from server', () => {
    const listId = 1;
    const responseData = { errors: [{ text: 'some error...' }] };
    mock.onPost(`/list/${listId}/card`).reply(400, responseData);

    return store.dispatch(createCard(listId, { title: mockCard.title }) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedCreateCard);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state of `selectedBoard.lists.cards` that updated one record`s title upon dispatch an action `updateCard` is successful', () => {
    const cardId = 1;
    const params = { title: 'update card' };
    const responseData = { card: { ...mockCard, ...params } };
    mock.onPatch(`/card/${cardId}/title`).reply(200, responseData);

    return store.dispatch(updateCard(cardId, params) as any)
      .then(() => {
        const { board } = store.getState();
        const targetList = board.selectedBoard.lists.find((list) => list.id === mockCard.listId);
        if (targetList === undefined) {
          expect(targetList).not.toBeUndefined();
        } else {
          const targetCard = targetList.cards.find((card) => card.id === cardId);
          expect(targetCard?.title).toBe(params.title);
        }
      });
  });

  test('returns state of dialogProps upon dispatch an action `updateCard` and recieved status 400 from server', () => {
    const cardId = 1;
    const responseData = { errors: [{ text: 'some error...' }] };
    mock.onPatch(`/card/${cardId}/title`).reply(400, responseData);

    return store.dispatch(updateCard(cardId, { title: mockCard.title }) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedUpdateCard);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state of `selectedBoard.lists.cards` that updated one record`s description upon dispatch an action `updateCard` is successful', () => {
    const cardId = 1;
    const params = { description: 'update card' };
    const responseData = { card: { ...mockCard, ...params } };
    mock.onPatch(`/card/${cardId}/description`).reply(200, responseData);

    return store.dispatch(updateCard(cardId, params) as any)
      .then(() => {
        const { board } = store.getState();
        const targetList = board.selectedBoard.lists.find((list) => list.id === mockCard.listId);
        if (targetList === undefined) {
          expect(targetList).not.toBeUndefined();
        } else {
          const targetCard = targetList.cards.find((card) => card.id === cardId);
          expect(targetCard?.description).toBe(params.description);
        }
      });
  });

  test('returns state of dialogProps upon dispatch an action `updateCard` and recieved status 400 from server', () => {
    const cardId = 1;
    const responseData = { errors: [{ text: 'some error...' }] };
    mock.onPatch(`/card/${cardId}/description`).reply(400, responseData);

    return store.dispatch(updateCard(cardId, { description: mockCard.description }) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedUpdateCard);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state of `selectedBoard.lists.cards` that deleted one record`s description upon dispatch an action `deleteCard` is successful', () => {
    const cardId = 1;
    const listId = 1;
    mock.onDelete(`/card/${cardId}`).reply(200);

    const previousState = store.getState().board;
    const previousList = previousState.selectedBoard.lists.find((list) => list.id === listId);

    if (previousList === undefined) {
      return expect(previousList).not.toBeUndefined();
    }

    return store.dispatch(deleteCard(cardId, listId) as any)
      .then(() => {
        const { board } = store.getState();
        const targetList = board.selectedBoard.lists.find((list) => list.id === listId);

        if (targetList === undefined) {
          expect(targetList).not.toBeUndefined();
        } else {
          expect(targetList.cards.length).toBe(previousList.cards.length - 1);
        }
      });
  });

  test('returns state of dialogProps upon dispatch an action `deleteCard` and recieved status 400 from server', () => {
    const cardId = 1;
    const listId = 1;
    const responseData = { errors: [{ text: 'some error...' }] };
    mock.onDelete(`/card/${cardId}`).reply(400, responseData);

    return store.dispatch(deleteCard(cardId, listId) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedDeleteCard);
        expect(dialog.description).toBe('some error...');
      });
  });
});
