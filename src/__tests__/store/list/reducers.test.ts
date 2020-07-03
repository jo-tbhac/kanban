import listReducer from '../../../store/list/reducers';
import { MOVE_LIST } from '../../../store/list/types';

describe('list reducer', () => {
  const initialLists = [
    {
      id: 1,
      name: 'list-a',
      boardId: 1,
      cards: [],
      index: 0,
    }, {
      id: 2,
      name: 'list-b',
      boardId: 1,
      cards: [],
      index: 1,
    }, {
      id: 3,
      name: 'list-c',
      boardId: 1,
      cards: [],
      index: 2,
    },
  ];

  test('returns lists upon recieving an action with type `MOVE_LIST`', () => {
    const payload = { dropId: 1, dragId: 2 };
    const { lists } = listReducer(initialLists, { type: MOVE_LIST, payload });

    const dropList = lists.find((list) => list.id === payload.dropId);
    const dragList = lists.find((list) => list.id === payload.dragId);

    expect(dropList?.index).toBe(1);
    expect(dragList?.index).toBe(0);
  });
});
