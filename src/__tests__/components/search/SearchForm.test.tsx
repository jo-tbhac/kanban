import React from 'react';
import { Route } from 'react-router-dom';

import { storeFactory, renderWithRouter } from '../../../testUtils';
import { Store } from '../../../store';
import SearchForm from '../../../components/search/SearchForm';
import { searchCardFormPlaceholder, searchBoardFormPlaceholder } from '../../../utils/text';

describe('SearchForm component', () => {
  let store: Store;
  const boardId = 1;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should renders `SearchCardTextField` and `SearchCardIndex` if current location path is equal expected location path', () => {
    const {
      getByPlaceholderText,
      getByTestId,
      queryByPlaceholderText,
      queryByTestId,
    } = renderWithRouter(
      <Route
        path="/board/:boardId"
        render={() => <SearchForm />}
      />,
      store,
      [`/board/${boardId}`],
    );

    expect(getByPlaceholderText(searchCardFormPlaceholder)).not.toBeNull();
    expect(getByTestId('searchCardIndex')).not.toBeNull();
    expect(queryByPlaceholderText(searchBoardFormPlaceholder)).toBeNull();
    expect(queryByTestId('searchBoardIndex')).toBeNull();
  });

  test('should renders `SearchBoardTextField` and `SearchBoardIndex` if current location path is not equal expected location path', () => {
    const {
      getByPlaceholderText,
      getByTestId,
      queryByPlaceholderText,
      queryByTestId,
    } = renderWithRouter(
      <Route
        path="/"
        render={() => <SearchForm />}
      />,
      store,
      ['/'],
    );

    expect(getByPlaceholderText(searchBoardFormPlaceholder)).not.toBeNull();
    expect(getByTestId('searchBoardIndex')).not.toBeNull();
    expect(queryByPlaceholderText(searchCardFormPlaceholder)).toBeNull();
    expect(queryByTestId('searchCardIndex')).toBeNull();
  });
});
