import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { mockBoard } from '../../../utils/mockData';
import { storeFactory, render } from '../../../testUtils';
import { Store } from '../../../store';
import { SearchBoardIndex } from '../../../components/search/SearchBoardIndex';

describe('SearchBoardIndex component', () => {
  let store: Store;
  let boardIds: number[];
  let keyword: string;

  beforeEach(() => {
    store = storeFactory();
    boardIds = [];
    keyword = '';
  });

  test('should renders component of `SearchCardInfo` if props of `boardIds.length` is zero and `keyword` is not blank', () => {
    keyword = 'msefn;mjgaf';
    const { getByTestId } = render(
      <MemoryRouter>
        <SearchBoardIndex keyword={keyword} boardIds={boardIds} />
      </MemoryRouter>,
      store,
    );

    expect(getByTestId('searchInfo')).not.toBeNull();
  });

  test('should renders components of `SearchBoard` if props of `boardIds.length` is more than zero', () => {
    boardIds = [1, 3, 4];
    store = storeFactory({
      board: {
        boards: [{ ...mockBoard, id: 1 }, { ...mockBoard, id: 3 }, { ...mockBoard, id: 4 }],
      },
    });

    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <SearchBoardIndex keyword={keyword} boardIds={boardIds} />
      </MemoryRouter>,
      store,
    );

    expect(getByTestId('searchBoardIndex').children).toHaveLength(boardIds.length);
    expect(queryByTestId('searchInfo')).toBeNull();
  });
});
