import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { mockCard } from '../../../utils/mockData';
import CardDescriptionText from '../../../components/card/CardDescriptionText';
import { CardContext } from '../../../components/card/CardIndexContainer';

describe('CardDescriptionText component', () => {
  let store: Store;
  let openCardDescriptionForm: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    openCardDescriptionForm = jest.fn();
  });

  test('should show the card description placeholder component if the card description is blank', () => {
    const { getByTestId, queryByTestId } = render(
      <CardContext.Provider value={{ ...mockCard, description: '' }}>
        <CardDescriptionText openCardDescriptionForm={openCardDescriptionForm} />
      </CardContext.Provider>,
      store,
    );

    expect(getByTestId('cardDescriptionTextPlaceholer')).toBeVisible();
    expect(queryByTestId('cardDescriptionText')).toBeNull();
  });

  test('should show the card description text component if the card description is not blank', () => {
    const { getByTestId, queryByTestId } = render(
      <CardContext.Provider value={{ ...mockCard, description: 'description' }}>
        <CardDescriptionText openCardDescriptionForm={openCardDescriptionForm} />
      </CardContext.Provider>,
      store,
    );

    expect(getByTestId('cardDescriptionText')).toBeVisible();
    expect(queryByTestId('cardDescriptionTextPlaceholer')).toBeNull();
  });

  test('should call `setCardDescriptionFormVisible` when clicked the card description placeholder component', () => {
    const { getByTestId } = render(
      <CardContext.Provider value={{ ...mockCard, description: '' }}>
        <CardDescriptionText openCardDescriptionForm={openCardDescriptionForm} />
      </CardContext.Provider>,
      store,
    );

    fireEvent.click(getByTestId('cardDescriptionTextPlaceholer'));
    expect(openCardDescriptionForm).toHaveBeenCalled();
  });

  test('should call `openCardDescriptionForm` when clicked the card description text component', () => {
    const { getByTestId } = render(
      <CardContext.Provider value={{ ...mockCard, description: 'description' }}>
        <CardDescriptionText openCardDescriptionForm={openCardDescriptionForm} />
      </CardContext.Provider>,
      store,
    );

    fireEvent.click(getByTestId('cardDescriptionText'));
    expect(openCardDescriptionForm).toHaveBeenCalled();
  });
});
