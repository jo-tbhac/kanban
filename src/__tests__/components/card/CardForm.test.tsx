import React from 'react';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { CardForm } from '../../../components/card/CardForm';

describe('CardForm component', () => {
  let store: Store;
  let createCard: jest.Mock;
  let setCardFormVisible: jest.Mock;
  let scrollToBottom: jest.Mock;
  const listId = 1;

  beforeEach(() => {
    store = storeFactory();
    createCard = jest.fn();
    setCardFormVisible = jest.fn();
    scrollToBottom = jest.fn();
  });

  test('update state of `cardTitle` when the card title textarea value changed', () => {
    const { getByTestId } = render(
      <CardForm
        setCardFormVisible={setCardFormVisible}
        createCard={createCard}
        listId={listId}
        scrollToBottom={scrollToBottom}
      />,
      store,
    );
    const mockText = 'sample card';
    const cardFormTextArea = getByTestId('cardFormTextArea') as HTMLTextAreaElement;
    fireEvent.change(cardFormTextArea, { target: { value: mockText } });

    expect(cardFormTextArea.value).toBe(mockText);
  });

  test('should call `setCardFormVisible` with `false` when the cancel button clicked', () => {
    const { getByTestId } = render(
      <CardForm
        setCardFormVisible={setCardFormVisible}
        createCard={createCard}
        listId={listId}
        scrollToBottom={scrollToBottom}
      />,
      store,
    );
    fireEvent.click(getByTestId('buttonCancel'));

    expect(setCardFormVisible).toHaveBeenCalledWith(false);
  });

  test('disabled the submit button if state of `cardTitle` is blank', () => {
    const { getByTestId } = render(
      <CardForm
        setCardFormVisible={setCardFormVisible}
        createCard={createCard}
        listId={listId}
        scrollToBottom={scrollToBottom}
      />,
      store,
    );
    expect(getByTestId('buttonSubmit')).toBeDisabled();
  });

  test('enabled the submit button if state of `cardTitle` is not blank', () => {
    const { getByTestId } = render(
      <CardForm
        setCardFormVisible={setCardFormVisible}
        createCard={createCard}
        listId={listId}
        scrollToBottom={scrollToBottom}
      />,
      store,
    );
    const mockText = 'sample card';
    const cardFormTextArea = getByTestId('cardFormTextArea') as HTMLTextAreaElement;
    fireEvent.change(cardFormTextArea, { target: { value: mockText } });

    expect(getByTestId('buttonSubmit')).toBeEnabled();
  });

  test('should not call `createCard` and `setCardFormVisible` if state of `cardTitle` is blank when clicked the submit button', () => {
    const { getByTestId } = render(
      <CardForm
        setCardFormVisible={setCardFormVisible}
        createCard={createCard}
        listId={listId}
        scrollToBottom={scrollToBottom}
      />,
      store,
    );
    fireEvent.click(getByTestId('buttonSubmit'));

    expect(createCard).toHaveBeenCalledTimes(0);
    expect(setCardFormVisible).toHaveBeenCalledTimes(0);
  });

  test('should not call `createCard` and `setCardFormVisible` if state of `cardTitle` is blank when press the enter key', () => {
    const { getByTestId } = render(
      <CardForm
        setCardFormVisible={setCardFormVisible}
        createCard={createCard}
        listId={listId}
        scrollToBottom={scrollToBottom}
      />,
      store,
    );
    fireEvent.keyPress(getByTestId('cardForm'), { key: 'Enter' });

    expect(createCard).toHaveBeenCalledTimes(0);
    expect(setCardFormVisible).toHaveBeenCalledWith(false);
  });

  test('should call `createCard` and `setCardFormVisible` when clicked the submit button', () => {
    const { getByTestId } = render(
      <CardForm
        setCardFormVisible={setCardFormVisible}
        createCard={createCard}
        listId={listId}
        scrollToBottom={scrollToBottom}
      />,
      store,
    );
    const mockText = 'sample card';
    const cardFormTextArea = getByTestId('cardFormTextArea') as HTMLTextAreaElement;
    fireEvent.change(cardFormTextArea, { target: { value: mockText } });
    fireEvent.click(getByTestId('buttonSubmit'));

    expect(createCard).toHaveBeenCalledWith(listId, { title: mockText });
    expect(setCardFormVisible).toHaveBeenCalledWith(false);
  });

  test('should call `createCard` and `setCardFormVisible` when press the enter key', () => {
    const { getByTestId } = render(
      <CardForm
        setCardFormVisible={setCardFormVisible}
        createCard={createCard}
        listId={listId}
        scrollToBottom={scrollToBottom}
      />,
      store,
    );
    const mockText = 'sample card';
    const cardFormTextArea = getByTestId('cardFormTextArea') as HTMLTextAreaElement;
    fireEvent.change(cardFormTextArea, { target: { value: mockText } });
    fireEvent.keyPress(cardFormTextArea, { key: 'Enter' });

    expect(setCardFormVisible).toHaveBeenCalledWith(false);
    expect(createCard).toHaveBeenCalledWith(listId, { title: mockText });
  });

  test('should call `scrollToBottom` upon a component did mount', () => {
    render(
      <CardForm
        setCardFormVisible={setCardFormVisible}
        createCard={createCard}
        listId={listId}
        scrollToBottom={scrollToBottom}
      />,
      store,
    );
    expect(scrollToBottom).toHaveBeenCalled();
  });
});
