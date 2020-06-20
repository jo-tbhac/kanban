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
  }, {
    id: 2,
    name: 'list-b',
    boardId: 1,
    cards: [],
  }, {
    id: 3,
    name: 'list-c',
    boardId: 1,
    cards: [],
  },
];

export const mockList = {
  id: 1,
  name: 'list-a',
  boardId: 1,
  cards: [],
};

export const mockCards = [
  {
    id: 1,
    title: 'card-1',
    description: 'description-1',
    listId: 1,
    labels: [],
  }, {
    id: 2,
    title: 'card-2',
    description: 'description-2',
    listId: 1,
    labels: [],
  }, {
    id: 3,
    title: 'card-3',
    description: 'description-3',
    listId: 1,
    labels: [],
  },
];

export const mockCard = {
  id: 1,
  title: 'card-1',
  description: 'description-1',
  listId: 1,
  labels: [],
};
