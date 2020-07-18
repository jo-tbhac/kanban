import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { mockCard } from '../../../utils/mockData';
import { CardDescriptionForm } from '../../../components/card/CardDescriptionForm';
import { CardContext } from '../../../components/card/CardIndexContainer';

describe('CardDescriptionForm component', () => {
  let store: Store;
  let closeCardDescriptionForm: jest.Mock;
  let updateCard: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    closeCardDescriptionForm = jest.fn();
    updateCard = jest.fn();
  });

  test('update state `cardDescription` when the card description textarea value changed', () => {
    const { getByRole } = render(
      <CardContext.Provider value={mockCard}>
        <CardDescriptionForm
          closeCardDescriptionForm={closeCardDescriptionForm}
          updateCard={updateCard}
        />
      </CardContext.Provider>,
      store,
    );

    const textarea = getByRole('textbox') as HTMLTextAreaElement;
    const mockText = 'description';
    fireEvent.change(textarea, { target: { value: mockText } });

    expect(textarea.value).toBe(mockText);
  });

  test('should call `closeCardDescriptionForm` when clicked a cancel button', () => {
    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardDescriptionForm
          closeCardDescriptionForm={closeCardDescriptionForm}
          updateCard={updateCard}
        />
      </CardContext.Provider>,
      store,
    );

    fireEvent.click(getByTestId('buttonCancel'));
    expect(closeCardDescriptionForm).toHaveBeenCalled();
  });

  test('should call `updateCard` when clicked a submit button', () => {
    const { getByTestId, getByRole } = render(
      <CardContext.Provider value={mockCard}>
        <CardDescriptionForm
          closeCardDescriptionForm={closeCardDescriptionForm}
          updateCard={updateCard}
        />
      </CardContext.Provider>,
      store,
    );

    const textarea = getByRole('textbox') as HTMLTextAreaElement;
    const mockText = 'update description';
    fireEvent.change(textarea, { target: { value: mockText } });
    fireEvent.click(getByTestId('buttonSubmit'));

    expect(updateCard).toHaveBeenCalledWith(mockCard.id, { description: mockText });
    expect(closeCardDescriptionForm).toHaveBeenCalled();
  });

  test('should not call `updateCard` if state of `cardDescription` has not changed when clicked a submit button', () => {
    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardDescriptionForm
          closeCardDescriptionForm={closeCardDescriptionForm}
          updateCard={updateCard}
        />
      </CardContext.Provider>,
      store,
    );

    fireEvent.click(getByTestId('buttonSubmit'));

    expect(updateCard).toHaveBeenCalledTimes(0);
    expect(closeCardDescriptionForm).toHaveBeenCalled();
  });
});
