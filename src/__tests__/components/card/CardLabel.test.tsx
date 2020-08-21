import React from 'react';

import { render, storeFactory, fireEvent } from '../../../testUtils';
import { mockCard, mockLabels } from '../../../utils/mockData';
import { Store } from '../../../store';
import { CardLabel } from '../../../components/card/CardLabel';
import CardContext from '../../../context/CardContext';

describe('CardLabel component', () => {
  let store: Store;
  let detachLabel: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    detachLabel = jest.fn();
  });

  test('should call `detachLabel` when click a component', () => {
    const mockLabel = { id: 10 };
    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardLabel labels={mockLabels} label={mockLabel} detachLabel={detachLabel} />
      </CardContext.Provider>,
      store,
    );

    fireEvent.click(getByTestId('cardLabel'));
    expect(detachLabel).toHaveBeenCalledWith({
      cardId: mockCard.id,
      labelId: mockLabel.id,
      listId: mockCard.listId,
    });
  });
});
