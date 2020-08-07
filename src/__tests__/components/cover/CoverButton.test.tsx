import React from 'react';

import { render, storeFactory } from '../../../testUtils';
import { mockCard } from '../../../utils/mockData';
import { Store } from '../../../store';
import { deleteCoverButtonText, fileCreateCover } from '../../../utils/text';
import { CardContext } from '../../../components/card/CardIndexContainer';
import CoverButton from '../../../components/cover/CoverButton';

describe('CoverButton component', () => {
  let store: Store;
  const fileId = 1;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should render a `DeleteCoverButton` if a `cover.fileId` is equal props of `fileId`', () => {
    const card = { ...mockCard, cover: { cardId: mockCard.id, fileId } };
    const { getByText, queryByText } = render(
      <CardContext.Provider value={card}>
        <CoverButton fileId={fileId} />
      </CardContext.Provider>,
      store,
    );

    expect(getByText(deleteCoverButtonText)).not.toBeNull();
    expect(queryByText(fileCreateCover)).toBeNull();
  });

  test('should render a `CreateCoverButton` if a `cover.fileId` is not equal props of `fileId`', () => {
    const card = { ...mockCard, cover: { cardId: mockCard.id, fileId: 2 } };
    const { getByText, queryByText } = render(
      <CardContext.Provider value={card}>
        <CoverButton fileId={fileId} />
      </CardContext.Provider>,
      store,
    );

    expect(getByText(fileCreateCover)).not.toBeNull();
    expect(queryByText(deleteCoverButtonText)).toBeNull();
  });
});
