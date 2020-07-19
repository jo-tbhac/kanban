import React from 'react';

import { storeFactory, render } from '../../../testUtils';
import { Store } from '../../../store';
import { SearchBoardTextField } from '../../../components/search/SearchBoardTextField';

describe('SearchCardTextField component', () => {
  let store: Store;
  let searchBoard: jest.Mock;
  let clearSearchBoardPool: jest.Mock;
  let onChangeSearchBoardKeyword: jest.Mock;
  let keyword: string;

  beforeEach(() => {
    jest.useFakeTimers();

    store = storeFactory();
    searchBoard = jest.fn();
    clearSearchBoardPool = jest.fn();
    onChangeSearchBoardKeyword = jest.fn();
    keyword = '';
  });

  test('should call `clearSearchBoardPool` upon change a text field value to empty string', () => {
    render(
      <SearchBoardTextField
        searchBoard={searchBoard}
        clearSearchBoardPool={clearSearchBoardPool}
        onChangeSearchBoardKeyword={onChangeSearchBoardKeyword}
        keyword={keyword}
      />,
      store,
    );

    expect(clearSearchBoardPool).toHaveBeenCalled();
  });

  test('should call `searchBoard` after 1 second upon change a text field value', () => {
    keyword = 'osxmrnvongie';
    render(
      <SearchBoardTextField
        searchBoard={searchBoard}
        clearSearchBoardPool={clearSearchBoardPool}
        onChangeSearchBoardKeyword={onChangeSearchBoardKeyword}
        keyword={keyword}
      />,
      store,
    );

    expect(searchBoard).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(searchBoard).toHaveBeenCalledWith(keyword);
  });

  test('should call `onChangeSearchBoardKeyword` with empty string upon a component will unmount', () => {
    const { unmount } = render(
      <SearchBoardTextField
        searchBoard={searchBoard}
        clearSearchBoardPool={clearSearchBoardPool}
        onChangeSearchBoardKeyword={onChangeSearchBoardKeyword}
        keyword=""
      />,
      store,
    );

    expect(onChangeSearchBoardKeyword).not.toHaveBeenCalled();
    unmount();
    expect(onChangeSearchBoardKeyword).toHaveBeenCalledWith('');
  });
});
