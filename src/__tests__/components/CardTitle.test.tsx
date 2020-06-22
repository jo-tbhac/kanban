import React from 'react';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { CardTitle } from '../../components/CardTitle';

describe('CardTitle component', () => {
  let store: Store;
  let updateCard: jest.Mock;
  const cardID = 1;
  const initialCardTitle = 'initial card';

  beforeEach(() => {
    store = storeFactory();
    updateCard = jest.fn();
  });

  test('should show the card title text field if state of `isCardTitleFormVisible` is true', () => {
    const { getByTestId, queryByTestId } = render(
      <CardTitle cardID={cardID} updateCard={updateCard} initialCardTitle={initialCardTitle} />,
      store,
    );
    fireEvent.click(getByTestId('cardTitleText'));

    expect(queryByTestId('cardTitleText')).toBeNull();
    expect(getByTestId('cardTitleTextField')).toBeVisible();
  });

  test('should hide the card title text field if state of `isCardTitleFormVisible` is false', () => {
    const { getByTestId, queryByTestId } = render(
      <CardTitle cardID={cardID} updateCard={updateCard} initialCardTitle={initialCardTitle} />,
      store,
    );

    expect(queryByTestId('cardTitleTextField')).toBeNull();
    expect(getByTestId('cardTitleText')).toBeVisible();
  });

  test('update state of `cardTitle` upon the card title text field value changed', () => {
    const { getByTestId } = render(
      <CardTitle cardID={cardID} updateCard={updateCard} initialCardTitle={initialCardTitle} />,
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
      <CardTitle cardID={cardID} updateCard={updateCard} initialCardTitle={initialCardTitle} />,
      store,
    );
    fireEvent.click(getByTestId('cardTitleText'));

    const mockText = 'edit card';
    const cardTitleTextField = getByTestId('cardTitleTextField') as HTMLInputElement;
    fireEvent.change(cardTitleTextField, { target: { value: mockText } });
    fireEvent.blur(cardTitleTextField);

    expect(updateCard).toHaveBeenCalledWith(cardID, { title: mockText });
  });

  test('should not call `updateCard` if state of `cardTitle` is blank when focus out from the card title text field', () => {
    const { getByTestId } = render(
      <CardTitle cardID={cardID} updateCard={updateCard} initialCardTitle={initialCardTitle} />,
      store,
    );
    fireEvent.click(getByTestId('cardTitleText'));

    const mockText = '';
    const cardTitleTextField = getByTestId('cardTitleTextField') as HTMLInputElement;
    fireEvent.change(cardTitleTextField, { target: { value: mockText } });
    fireEvent.blur(cardTitleTextField);

    expect(updateCard).toHaveBeenCalledTimes(0);
  });

  test('should not call `updateCard` if state of `cardTitle` is equal `initialCardTitle` when focus out from the card title text field', () => {
    const { getByTestId } = render(
      <CardTitle cardID={cardID} updateCard={updateCard} initialCardTitle={initialCardTitle} />,
      store,
    );
    fireEvent.click(getByTestId('cardTitleText'));

    const mockText = initialCardTitle;
    const cardTitleTextField = getByTestId('cardTitleTextField') as HTMLInputElement;
    fireEvent.change(cardTitleTextField, { target: { value: mockText } });
    fireEvent.blur(cardTitleTextField);

    expect(updateCard).toHaveBeenCalledTimes(0);
  });
});
