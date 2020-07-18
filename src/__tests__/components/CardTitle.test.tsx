import React from 'react';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { mockCard } from '../../utils/mockData';
import { CardTitle } from '../../components/card/CardTitle';
import { CardContext } from '../../components/card/CardIndexContainer';

describe('CardTitle component', () => {
  let store: Store;
  let updateCard: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    updateCard = jest.fn();
  });

  test('should show the card title text field if state of `isCardTitleFormVisible` is true', () => {
    const { getByTestId, queryByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardTitle updateCard={updateCard} />
      </CardContext.Provider>,
      store,
    );
    fireEvent.click(getByTestId('cardTitleText'));

    expect(queryByTestId('cardTitleText')).toBeNull();
    expect(getByTestId('cardTitleTextField')).toBeVisible();
  });

  test('should hide the card title text field if state of `isCardTitleFormVisible` is false', () => {
    const { getByTestId, queryByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardTitle updateCard={updateCard} />
      </CardContext.Provider>,
      store,
    );

    expect(queryByTestId('cardTitleTextField')).toBeNull();
    expect(getByTestId('cardTitleText')).toBeVisible();
  });

  test('update state of `cardTitle` upon the card title text field value changed', () => {
    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardTitle updateCard={updateCard} />
      </CardContext.Provider>,
      store,
    );
    fireEvent.click(getByTestId('cardTitleText'));

    const mockText = 'edit card';
    const cardTitleTextField = getByTestId('cardTitleTextField') as HTMLInputElement;
    fireEvent.change(cardTitleTextField, { target: { value: mockText } });

    expect(cardTitleTextField.value).toBe(mockText);
  });

  test('should call `updateCard` when focus out from the card title text field', () => {
    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardTitle updateCard={updateCard} />
      </CardContext.Provider>,
      store,
    );
    fireEvent.click(getByTestId('cardTitleText'));

    const mockText = 'edit card';
    const cardTitleTextField = getByTestId('cardTitleTextField') as HTMLInputElement;
    fireEvent.change(cardTitleTextField, { target: { value: mockText } });
    fireEvent.blur(cardTitleTextField);

    expect(updateCard).toHaveBeenCalledWith(mockCard.id, { title: mockText });
  });

  test('should not call `updateCard` if state of `cardTitle` is blank when focus out from the card title text field', () => {
    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardTitle updateCard={updateCard} />
      </CardContext.Provider>,
      store,
    );
    fireEvent.click(getByTestId('cardTitleText'));

    const mockText = '';
    const cardTitleTextField = getByTestId('cardTitleTextField') as HTMLInputElement;
    fireEvent.change(cardTitleTextField, { target: { value: mockText } });
    fireEvent.blur(cardTitleTextField);

    expect(updateCard).toHaveBeenCalledTimes(0);
  });

  test('should not call `updateCard` if state of `cardTitle` is equal the initial card title when focus out from the card title text field', () => {
    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardTitle updateCard={updateCard} />
      </CardContext.Provider>,
      store,
    );
    fireEvent.click(getByTestId('cardTitleText'));

    const cardTitleTextField = getByTestId('cardTitleTextField') as HTMLInputElement;
    fireEvent.change(cardTitleTextField, { target: { value: mockCard.title } });
    fireEvent.blur(cardTitleTextField);

    expect(updateCard).toHaveBeenCalledTimes(0);
  });
});
