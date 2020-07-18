import React from 'react';

import { render, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { SearchCardInfo } from '../../../components/search/SearchCardInfo';
import { searchingText, searchCardNotFound } from '../../../utils/text';

describe('SearchCardInfo component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should renders a text `searchCardNotFound` if props of `isSearching` is false', () => {
    const { getByText, queryByText } = render(<SearchCardInfo isSearching={false} />, store);
    expect(getByText(searchCardNotFound)).not.toBeNull();
    expect(queryByText(searchingText)).toBeNull();
  });

  test('should renders a text `searchingText` if props of `isSearching` is true', () => {
    const { getByText, queryByText } = render(<SearchCardInfo isSearching />, store);
    expect(getByText(searchingText)).not.toBeNull();
    expect(queryByText(searchCardNotFound)).toBeNull();
  });
});
