import React from 'react';

import { render, storeFactory } from '../../../testUtils';
import { mockFile, mockCard } from '../../../utils/mockData';
import { Store } from '../../../store';
import CardContext from '../../../context/CardContext';
import { FileIndex } from '../../../components/file/FileIndex';

describe('FileIndex component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should not render a component if props of `files.length` is zero', () => {
    const { queryByTestId } = render(<FileIndex files={[]} />, store);
    expect(queryByTestId('fileIndex')).toBeNull();
  });

  test('should render components `File` as many as `files`', () => {
    const files = [
      { ...mockFile, id: 1, cardId: mockCard.id },
      { ...mockFile, id: 2, cardId: mockCard.id },
      { ...mockFile, id: 3, cardId: 100 },
    ];

    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <FileIndex files={files} />
      </CardContext.Provider>,
      store,
    );
    expect(getByTestId('fileIndex').children).toHaveLength(2);
  });
});
