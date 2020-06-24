import React from 'react';

import { render, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { CardDescriptionForm } from '../../components/CardDescriptionForm';

describe('CardDescriptionForm component', () => {
  let store: Store;
  let setCardDescriptionFormVisible: jest.Mock;
  let updateCard: jest.Mock;
  const cardID = 1;
  const initialCardDescription = 'description';

  beforeEach(() => {
    store = storeFactory();
    setCardDescriptionFormVisible = jest.fn();
    updateCard = jest.fn();
  });

  test('update state `cardDescription` when the card description textarea value changed', () => {
    const { getByRole } = render(
      <CardDescriptionForm
        cardID={cardID}
        initialCardDescription={initialCardDescription}
        setCardDescriptionFormVisible={setCardDescriptionFormVisible}
        updateCard={updateCard}
      />,
      store,
    );

    const textarea = getByRole('textbox') as HTMLTextAreaElement;
    const mockText = 'description';
    fireEvent.change(textarea, { target: { value: mockText } });

    expect(textarea.value).toBe(mockText);
  });

  test('should call `setCardDescriptionFormVisible` with `false` when clicked a cancel button', () => {
    const { getByTestId } = render(
      <CardDescriptionForm
        cardID={cardID}
        initialCardDescription={initialCardDescription}
        setCardDescriptionFormVisible={setCardDescriptionFormVisible}
        updateCard={updateCard}
      />,
      store,
    );

    fireEvent.click(getByTestId('cardDescriptionFormCancelButton'));
    expect(setCardDescriptionFormVisible).toHaveBeenCalledWith(false);
  });

  test('should call `updateCard` when clicked a submit button', () => {
    const { getByTestId, getByRole } = render(
      <CardDescriptionForm
        cardID={cardID}
        initialCardDescription={initialCardDescription}
        setCardDescriptionFormVisible={setCardDescriptionFormVisible}
        updateCard={updateCard}
      />,
      store,
    );

    const textarea = getByRole('textbox') as HTMLTextAreaElement;
    const mockText = 'update description';
    fireEvent.change(textarea, { target: { value: mockText } });
    fireEvent.click(getByTestId('cardDescriptionFormSubmitButton'));

    expect(updateCard).toHaveBeenCalledWith(cardID, { description: mockText });
    expect(setCardDescriptionFormVisible).toHaveBeenCalledWith(false);
  });

  test('should not call `updateCard` if state of `cardDescription` has not changed when clicked a submit button', () => {
    const { getByTestId } = render(
      <CardDescriptionForm
        cardID={cardID}
        initialCardDescription={initialCardDescription}
        setCardDescriptionFormVisible={setCardDescriptionFormVisible}
        updateCard={updateCard}
      />,
      store,
    );

    fireEvent.click(getByTestId('cardDescriptionFormSubmitButton'));

    expect(updateCard).toHaveBeenCalledTimes(0);
    expect(setCardDescriptionFormVisible).toHaveBeenCalledWith(false);
  });
});
