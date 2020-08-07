import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import snakeCaseKeys from 'snakecase-keys';

import { storeFactory } from '../../../testUtils';
import { mockList, mockCard } from '../../../utils/mockData';
import { Store } from '../../../store';
import { dialogTypeError } from '../../../store/dialog/types';
import { failedCreateCover, failedUpdateCover, failedDeleteCover } from '../../../utils/text';
import { createCover, updateCover, deleteCover } from '../../../store/cover/actions';

describe('cover actions', () => {
  let store: Store;
  let mock: MockAdapter;

  beforeEach(() => {
    store = storeFactory();
    mock = new MockAdapter(axios);
  });

  test('returns state `cards` that added a `cover` when an action of `createCover` was successful', () => {
    store = storeFactory({
      board: {
        selectedBoard: {
          lists: [
            {
              ...mockList,
              cards: [{ ...mockCard, listId: mockList.id, cover: null }],
            },
          ],
        },
      },
    });

    const cover = { cardId: mockCard.id, fileId: 1 };
    const responseData = { cover: snakeCaseKeys(cover) };

    mock.onPost(`/card/${cover.cardId}/cover/${cover.fileId}`).reply(201, responseData);

    return store.dispatch(createCover(mockList.id, cover.cardId, cover.fileId) as any)
      .then(() => {
        const { board } = store.getState();
        expect(board.selectedBoard.lists[0].cards[0].cover).toEqual(cover);
      });
  });

  test('returns state of dialogProps upon dispatch an action `createCover` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    const fileId = 1;
    const cardId = 2;
    const listId = 3;

    mock.onPost(`/card/${cardId}/cover/${fileId}`).reply(400, responseData);

    return store.dispatch(createCover(listId, cardId, fileId) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedCreateCover);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state `cards` that updated a `cover` when an action of `updateCover` was successful', () => {
    const previousCover = { cardId: mockCard.id, fileId: 1 };
    const newFileId = 2;
    store = storeFactory({
      board: {
        selectedBoard: {
          lists: [
            {
              ...mockList,
              cards: [{ ...mockCard, listId: mockList.id, cover: previousCover }],
            },
          ],
        },
      },
    });

    mock.onPatch('/cover').reply(200);

    return store.dispatch(updateCover(mockList.id, mockCard.id, newFileId) as any)
      .then(() => {
        const { board } = store.getState();
        const newCover = { ...previousCover, fileId: newFileId };
        expect(board.selectedBoard.lists[0].cards[0].cover).toEqual(newCover);
      });
  });

  test('returns state of dialogProps upon dispatch an action `updateCover` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    const newFileId = 1;
    const cardId = 2;
    const listId = 3;

    mock.onPatch('/cover').reply(400, responseData);

    return store.dispatch(updateCover(listId, cardId, newFileId) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedUpdateCover);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state `cards` that deleted a `cover` when an action of `deleteCover` was successful', () => {
    const cover = { cardId: mockCard.id, fileId: 1 };
    store = storeFactory({
      board: {
        selectedBoard: {
          lists: [
            {
              ...mockList,
              cards: [{ ...mockCard, listId: mockList.id, cover }],
            },
          ],
        },
      },
    });

    mock.onDelete(`/card/${cover.cardId}/cover`).reply(200);

    return store.dispatch(deleteCover(mockList.id, mockCard.id) as any)
      .then(() => {
        const { board } = store.getState();
        expect(board.selectedBoard.lists[0].cards[0].cover).toBeNull();
      });
  });

  test('returns state of dialogProps upon dispatch an action `deleteCover` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    const cardId = 2;
    const listId = 3;

    mock.onDelete(`/card/${cardId}/cover`).reply(400, responseData);

    return store.dispatch(deleteCover(listId, cardId) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedDeleteCover);
        expect(dialog.description).toBe('some error...');
      });
  });
});
