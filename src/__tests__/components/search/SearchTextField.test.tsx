import React from 'react';

import { storeFactory, render, fireEvent } from '../../../testUtils';
import { Store } from '../../../store';
import { SearchTextField } from '../../../components/search/SearchTextField';

describe('SearchTextField component', () => {
  let store: Store;
  let keyword: string;
  let onChangeSearchKeyword: jest.Mock;
  let placeholder: string;

  beforeEach(() => {
    store = storeFactory();
    keyword = '';
    onChangeSearchKeyword = jest.fn();
    placeholder = '';
  });

  test('should renders an icon of `search` if props of `keyword` is blank', () => {
    const { getByTestId, queryByTestId } = render(
      <SearchTextField
        keyword={keyword}
        onChangeSearchKeyword={onChangeSearchKeyword}
        placeholder={placeholder}
      />,
      store,
    );

    expect(getByTestId('searchTextFieldSearchIcon')).not.toBeNull();
    expect(queryByTestId('searchTextFieldClearButton')).toBeNull();
  });

  test('should renders a clear button if props of `keyword` is blank', () => {
    keyword = 'smefjm;jm';
    const { getByTestId, queryByTestId } = render(
      <SearchTextField
        keyword={keyword}
        onChangeSearchKeyword={onChangeSearchKeyword}
        placeholder={placeholder}
      />,
      store,
    );

    expect(getByTestId('searchTextFieldClearButton')).not.toBeNull();
    expect(queryByTestId('searchTextFieldSearchIcon')).toBeNull();
  });

  test('should call `onChangeSearchKeyword` with empty string upon click a clear button', () => {
    keyword = 'osxmrnvongie';
    const { getByTestId } = render(
      <SearchTextField
        keyword={keyword}
        onChangeSearchKeyword={onChangeSearchKeyword}
        placeholder={placeholder}
      />,
      store,
    );

    fireEvent.click(getByTestId('searchTextFieldClearButton'));
    expect(onChangeSearchKeyword).toHaveBeenCalledWith('');
  });

  test('should call `onChangeSearchKeyword` with input string upon change a text field value', () => {
    keyword = 'osxmrnvongie';
    const { getByTestId } = render(
      <SearchTextField
        keyword=""
        onChangeSearchKeyword={onChangeSearchKeyword}
        placeholder={placeholder}
      />,
      store,
    );

    fireEvent.change(getByTestId('searchTextField'), { target: { value: keyword } });
    expect(onChangeSearchKeyword).toHaveBeenCalledWith(keyword);
  });
});
