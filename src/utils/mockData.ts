export const mockBoards = [
  {
    id: 1,
    name: 'board1',
    updatedAt: '2020-10-10T00:00:00',
    lists: [],
    backgroundImage: null,
  }, {
    id: 2,
    name: 'board2',
    updatedAt: '2020-10-10T00:00:00',
    lists: [],
    backgroundImage: null,
  }, {
    id: 3,
    name: 'board3',
    updatedAt: '2020-10-10T00:00:00',
    lists: [],
    backgroundImage: null,
  },
];

export const mockBoard = {
  id: 1,
  name: 'Most commonly',
  updatedAt: '2020-10-10T00:00:00',
  lists: [],
  backgroundImage: null,
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
    cover: { cardId: 1, fileId: 1 },
  }, {
    id: 2,
    title: 'card-2',
    description: 'description-2',
    listId: 1,
    labels: [],
    index: 1,
    cover: { cardId: 2, fileId: 2 },
  }, {
    id: 3,
    title: 'card-3',
    description: 'description-3',
    listId: 1,
    labels: [],
    index: 2,
    cover: { cardId: 3, fileId: 3 },
  },
];

export const mockCard = {
  id: 1,
  title: 'card-1',
  description: 'description-1',
  listId: 1,
  labels: [],
  index: 0,
  cover: { cardId: 1, fileId: 1 },
};

export const mockListsWithCard = [
  {
    id: 1,
    name: 'list-a',
    boardId: 1,
    cards: mockCards,
    index: 0,
    cover: { cardId: 1, fileId: 1 },
  }, {
    id: 2,
    name: 'list-b',
    boardId: 1,
    cards: [],
    index: 1,
    cover: { cardId: 2, fileId: 2 },
  }, {
    id: 3,
    name: 'list-c',
    boardId: 1,
    cards: [],
    index: 2,
    cover: { cardId: 3, fileId: 3 },
  },
];

export const mockListsWithCardLabel = [
  {
    id: 1,
    name: 'list-a',
    boardId: 1,
    cards: [{ ...mockCard, labels: [mockLabel] }],
    index: 0,
    cover: { cardId: 1, fileId: 1 },
  }, {
    id: 2,
    name: 'list-b',
    boardId: 1,
    cards: [],
    index: 1,
    cover: { cardId: 2, fileId: 2 },
  }, {
    id: 3,
    name: 'list-c',
    boardId: 1,
    cards: [],
    index: 2,
    cover: { cardId: 3, fileId: 3 },
  },
];

export const mockCheckLists = [
  {
    id: 1,
    title: 'checkLists-1',
    cardId: 1,
    items: [],
  }, {
    id: 2,
    title: 'checkLists-2',
    cardId: 1,
    items: [],
  }, {
    id: 3,
    title: 'checkLists-3',
    cardId: 2,
    items: [],
  },
];

export const mockCheckList = {
  id: 1,
  title: 'checkLists-1',
  cardId: 1,
  items: [],
};

export const mockCheckListItem = {
  id: 1,
  name: 'check list item 1',
  check: false,
  checkListId: 1,
};

export const mockFile = {
  id: 1,
  displayName: 'file-1',
  url: 'https://file-1',
  contentType: 'image/png',
  cardId: 1,
};

export const mockBackgroundImage = {
  id: 1,
  url: 'http://localhost/images',
  theme: 'dark',
};
