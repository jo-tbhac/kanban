import React from 'react';

import { mockCard, mockLabels } from '../../utils/mockData';
import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { CardLabelFormRow } from '../../components/card/CardLabelFormRow';
import { CardContext } from '../../components/card/CardIndexContainer';

describe('CardLabelFormRow component', () => {
  let store: Store;
  let attachLabel: jest.Mock;
  let detachLabel: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    attachLabel = jest.fn();
    detachLabel = jest.fn();
  });

  test('should class name contain modifire of `--attached` if `card.labels` includes props of `label`', () => {
    const mockLabel = mockLabels[0];
    const { getByTestId } = render(
      <CardContext.Provider value={{ ...mockCard, labels: mockLabels }}>
        <CardLabelFormRow label={mockLabel} attachLabel={attachLabel} detachLabel={detachLabel} />
      </CardContext.Provider>,
      store,
    );

    expect(getByTestId(`cardLabelFormRow-${mockLabel.id}`)).toHaveClass('cardLabelFormRow--attached');
  });

  test('should class name does not contain modifire of `--attached` if `card.labels` excludes props of `label`', () => {
    const mockLabel = mockLabels[0];
    const filteredMockLabels = mockLabels.filter((_, index) => index !== 0);
    const { getByTestId } = render(
      <CardContext.Provider value={{ ...mockCard, labels: filteredMockLabels }}>
        <CardLabelFormRow label={mockLabel} attachLabel={attachLabel} detachLabel={detachLabel} />
      </CardContext.Provider>,
      store,
    );

    expect(getByTestId(`cardLabelFormRow-${mockLabel.id}`)).not.toHaveClass('cardLabelFormRow--attached');
    expect(getByTestId(`cardLabelFormRow-${mockLabel.id}`)).toHaveClass('cardLabelFormRow');
  });

  test('should call `attachLabel` if state of `isAttached` is false when clicked an `cardLabelFormRow`', () => {
    const mockLabel = mockLabels[0];
    const filteredMockLabels = mockLabels.filter((_, index) => index !== 0);
    const { getByTestId } = render(
      <CardContext.Provider value={{ ...mockCard, labels: filteredMockLabels }}>
        <CardLabelFormRow label={mockLabel} attachLabel={attachLabel} detachLabel={detachLabel} />
      </CardContext.Provider>,
      store,
    );

    fireEvent.click(getByTestId(`cardLabelFormRow-${mockLabel.id}`));
    const payload = { cardId: mockCard.id, listId: mockCard.listId, labelId: mockLabel.id };
    expect(attachLabel).toHaveBeenCalledWith(payload);
    expect(detachLabel).toHaveBeenCalledTimes(0);
  });

  test('should call `detachLabel` if state of `isAttached` is true when clicked an `cardLabelFormRow`', () => {
    const mockLabel = mockLabels[0];
    const { getByTestId } = render(
      <CardContext.Provider value={{ ...mockCard, labels: mockLabels }}>
        <CardLabelFormRow label={mockLabel} attachLabel={attachLabel} detachLabel={detachLabel} />
      </CardContext.Provider>,
      store,
    );

    fireEvent.click(getByTestId(`cardLabelFormRow-${mockLabel.id}`));
    const payload = { cardId: mockCard.id, listId: mockCard.listId, labelId: mockLabel.id };
    expect(detachLabel).toHaveBeenCalledWith(payload);
    expect(attachLabel).toHaveBeenCalledTimes(0);
  });
});
