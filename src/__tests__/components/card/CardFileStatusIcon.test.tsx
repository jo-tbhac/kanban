import React from 'react';

import { render, storeFactory } from '../../../testUtils';
import { mockCard, mockFile } from '../../../utils/mockData';
import { Store } from '../../../store';
import { File } from '../../../store/file/types';
import { CardFileStatusIcon } from '../../../components/card/CardFileStatusIcon';

describe('CardFileStatusIcon component', () => {
  let store: Store;
  let files: File[];

  beforeEach(() => {
    store = storeFactory();
    files = [];
  });

  test('should not render a component if props of `files.length` is zero', () => {
    const { queryByTestId } = render(<CardFileStatusIcon files={files} card={mockCard} />, store);
    expect(queryByTestId('cardStatus')).toBeNull();
  });

  test('should render a component if props of `files.length` is more than zero', () => {
    files = [
      { ...mockFile, id: 1, cardId: mockCard.id },
      { ...mockFile, id: 2, cardId: mockCard.id },
      { ...mockFile, id: 3, cardId: 100 },
    ];

    const { getByTestId } = render(<CardFileStatusIcon files={files} card={mockCard} />, store);

    expect(getByTestId('cardStatus')).not.toBeNull();
    expect(getByTestId('cardStatusCount')).toHaveTextContent('2');
  });
});
