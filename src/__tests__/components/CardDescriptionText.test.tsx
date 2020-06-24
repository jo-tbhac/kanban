import React from 'react';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import CardDescriptionText from '../../components/CardDescriptionText';

describe('CardDescriptionText component', () => {
  let store: Store;
  let cardDescription: string;
  let setCardDescriptionFormVisible: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    cardDescription = '';
    setCardDescriptionFormVisible = jest.fn();
  });

  test('should show the card description placeholder component if props of `cardDescription` is blank', () => {
    const { getByTestId, queryByTestId } = render(
      <CardDescriptionText
        cardDescription={cardDescription}
        setCardDescriptionFormVisible={setCardDescriptionFormVisible}
      />,
      store,
    );

    expect(getByTestId('cardDescriptionTextPlaceholer')).toBeVisible();
    expect(queryByTestId('cardDescriptionText')).toBeNull();
  });

  test('should show the card description text component if props of `cardDescription` is not blank', () => {
    cardDescription = 'description';
    const { getByTestId, queryByTestId } = render(
      <CardDescriptionText
        cardDescription={cardDescription}
        setCardDescriptionFormVisible={setCardDescriptionFormVisible}
      />,
      store,
    );

    expect(getByTestId('cardDescriptionText')).toBeVisible();
    expect(queryByTestId('cardDescriptionTextPlaceholer')).toBeNull();
  });

  test('should call `setCardDescriptionFormVisible` with `true` when clicked the card description placeholder component', () => {
    const { getByTestId } = render(
      <CardDescriptionText
        cardDescription={cardDescription}
        setCardDescriptionFormVisible={setCardDescriptionFormVisible}
      />,
      store,
    );

    fireEvent.click(getByTestId('cardDescriptionTextPlaceholer'));
    expect(setCardDescriptionFormVisible).toHaveBeenCalledWith(true);
  });

  test('should call `setCardDescriptionFormVisible` with `true` when clicked the card description text component', () => {
    cardDescription = 'description';
    const { getByTestId } = render(
      <CardDescriptionText
        cardDescription={cardDescription}
        setCardDescriptionFormVisible={setCardDescriptionFormVisible}
      />,
      store,
    );

    fireEvent.click(getByTestId('cardDescriptionText'));
    expect(setCardDescriptionFormVisible).toHaveBeenCalledWith(true);
  });
});
