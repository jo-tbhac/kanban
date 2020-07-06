export const mockBoards = [
  {
    id: 1,
    name: 'board1',
    updatedAt: '2020-10-10T00:00:00',
    lists: [],
  }, {
    id: 2,
    name: 'board2',
    updatedAt: '2020-10-10T00:00:00',
    lists: [],
  }, {
    id: 3,
    name: 'board3',
    updatedAt: '2020-10-10T00:00:00',
    lists: [],
  },
];

export const mockBoard = {
  id: 1,
  name: 'Most commonly',
  updatedAt: '2020-10-10T00:00:00',
  lists: [],
};

export const mockLabels = [
  {
    id: 1,
    name: 'development',
    color: '#f44336',
  }, {
    id: 2,
    name: 'marketing',
    color: '#2196f3',
  },
];

export const mockLabel = {
  id: 1,
  name: 'development',
  color: '#f44336',
};

export const mockLists = [
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

export const mockList = {
  id: 1,
  name: 'list-a',
  boardId: 1,
  cards: [],
  index: 0,
};

export const mockCards = [
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

export const mockCard = {
  id: 1,
  title: 'card-1',
  description: 'description-1',
  listId: 1,
  labels: [],
  index: 0,
};

export const mockListsWithCard = [
  {
    id: 1,
    name: 'list-a',
    boardId: 1,
    cards: mockCards,
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

export const mockListsWithCardLabel = [
  {
    id: 1,
    name: 'list-a',
    boardId: 1,
    cards: [{ ...mockCard, labels: [mockLabel] }],
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
