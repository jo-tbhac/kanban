import listReducer from '../../../store/list/reducers';
import { MOVE_LIST } from '../../../store/list/types';
import { MOVE_CARD_ACROSS_LIST, MOVE_CARD_TO_EMPTY_LIST } from '../../../store/card/types';

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

  const initialCards = [
    {
      id: 1,
      title: 'card-1',
      description: 'description-1',
      listId: 1,
      labels: [],
      index: 0,
    }, {
      id: 2,
      title: 'card-2',
      description: 'description-2',
      listId: 1,
      labels: [],
      index: 1,
    }, {
      id: 3,
      title: 'card-3',
      description: 'description-3',
      listId: 1,
      labels: [],
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

  test('returns lists upon recieving an action with type `MOVE_CARD_ACROSS_LIST`', () => {
    const dragListId = 1;
    const dropTargetListId = 2;
    const dropTargetCards = initialCards.map((card, index) => ({
      ...card,
      id: initialCards.length + index + 1,
      listId: dropTargetListId,
    }));

    const initialListsWithCards = initialLists.map((list) => {
      if (list.id === dragListId) {
        return { ...list, cards: initialCards };
      }
      if (list.id === dropTargetListId) {
        return { ...list, cards: dropTargetCards };
      }
      return list;
    });

    const dropId = 4;
    const dragId = 1;

    const payload = {
      dropId,
      dragId,
      dropListId: dropTargetListId,
      dragListId,
    };

    const { lists } = listReducer(initialListsWithCards, { type: MOVE_CARD_ACROSS_LIST, payload });

    const dropTargetList = lists.find((list) => list.id === dropTargetListId);
    const dragList = lists.find((list) => list.id === dragListId);
    const dropTargetCard = dropTargetCards.find((card) => card.id === dropId);
    const dragCard = initialCards.find((card) => card.id === dragId);

    if (!dropTargetList || !dragList || !dropTargetCard || !dragCard) {
      expect(dropTargetList).not.toBeUndefined();
      expect(dragList).not.toBeUndefined();
      expect(dropTargetCard).not.toBeUndefined();
      expect(dragCard).not.toBeUndefined();
      return;
    }

    expect(dropTargetList.cards.length).toBe(dropTargetCards.length + 1);
    expect(dragList.cards.length).toBe(initialLists.length - 1);

    for (let i = 0; i < dragList.cards.length; i += 1) {
      expect(dragList.cards[i].index).toBe(i);
      expect(dragList.cards[i].id).toBe(initialCards[dragCard.index + i + 1].id);
    }

    for (let i = 0; i < dropTargetList.cards.length; i += 1) {
      expect(dropTargetList.cards[i].index).toBe(i);
    }

    const dropTargetIndex = dropTargetCards.findIndex((card) => card.id === dropId);
    const addedCardIndex = dropTargetList.cards.findIndex((card) => card.id === dragId);
    expect(dropTargetIndex).toBe(addedCardIndex);
  });

  test('returns lists upon recieving an action with type `MOVE_CARD_TO_EMPTY_LIST`', () => {
    const dragListId = 1;
    const dropTargetListId = 2;

    const initialListsWithCards = initialLists.map((list) => (
      list.id === dragListId ? { ...list, cards: initialCards } : list
    ));

    const dragId = 1;

    const payload = {
      dragId,
      dropListId: dropTargetListId,
      dragListId,
    };

    const { lists } = listReducer(
      initialListsWithCards,
      { type: MOVE_CARD_TO_EMPTY_LIST, payload },
    );

    const dropTargetList = lists.find((list) => list.id === dropTargetListId);
    const dragList = lists.find((list) => list.id === dragListId);
    const dragCard = initialCards.find((card) => card.id === dragId);

    if (!dropTargetList || !dragList || !dragCard) {
      expect(dropTargetList).not.toBeUndefined();
      expect(dragList).not.toBeUndefined();
      expect(dragCard).not.toBeUndefined();
      return;
    }

    expect(dropTargetList.cards.length).toBe(1);
    expect(dragList.cards.length).toBe(initialLists.length - 1);

    for (let i = 0; i < dragList.cards.length; i += 1) {
      expect(dragList.cards[i].index).toBe(i);
      expect(dragList.cards[i].id).toBe(initialCards[dragCard.index + i + 1].id);
    }

    for (let i = 0; i < dropTargetList.cards.length; i += 1) {
      expect(dropTargetList.cards[i].index).toBe(i);
    }

    expect(dropTargetList.cards[0].id).toBe(dragCard.id);
  });
});
