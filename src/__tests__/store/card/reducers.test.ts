import cardReducer from '../../../store/card/reducers';
import { MOVE_CARD } from '../../../store/card/types';

describe('card reducer', () => {
  const initialCards = [
    {
      id: 1,
      title: 'card-1',
      description: 'description-1',
      listId: 1,
      labels: [],
      index: 0,
      cover: null,
    }, {
      id: 2,
      title: 'card-2',
      description: 'description-2',
      listId: 1,
      labels: [],
      index: 1,
      cover: null,
    }, {
      id: 3,
      title: 'card-3',
      description: 'description-3',
      listId: 1,
      labels: [],
      index: 2,
      cover: null,
    },
  ];

  test('returns cards upon recieving an action with type `MOVE_CARD`', () => {
    const payload = { dropId: 1, dragId: 2, listId: 1 };
    const { cards } = cardReducer(initialCards, { type: MOVE_CARD, payload });

    const dropCard = cards.find((card) => card.id === payload.dropId);
    const dragCard = cards.find((card) => card.id === payload.dragId);

    expect(dropCard?.index).toBe(1);
    expect(dragCard?.index).toBe(0);
  });
});
