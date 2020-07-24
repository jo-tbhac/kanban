import React from 'react';

import { mockCard } from '../../../utils/mockData';
import { CardContext } from '../../../components/card/CardIndexContainer';
import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { CardSideBarCheckListButton } from '../../../components/card/CardSideBarCheckListButton';

describe('CardSideBarCheckListButton component', () => {
  let store: Store;
  let createCheckList: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    createCheckList = jest.fn();
  });

  test('should show a `CardMenuForm` upon press a `CardSideBarButton`', () => {
    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardSideBarCheckListButton createCheckList={createCheckList} />
      </CardContext.Provider>,
      store,
    );

    fireEvent.click(getByTestId('cardSideBarButton'));
    expect(getByTestId('cardMenuForm')).toBeVisible();
  });

  test('should not render a component if state of `formVisible` is false', () => {
    const { queryByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardSideBarCheckListButton createCheckList={createCheckList} />
      </CardContext.Provider>,
      store,
    );
    expect(queryByTestId('cardMenuForm')).toBeNull();
  });

  test('should update state `title` upon changed text field value', () => {
    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardSideBarCheckListButton createCheckList={createCheckList} />
      </CardContext.Provider>,
      store,
    );

    const title = 'jlx,jeo we';
    fireEvent.click(getByTestId('cardSideBarButton'));

    const textField = getByTestId('checkListFormTextField') as HTMLInputElement;
    fireEvent.change(textField, { target: { value: title } });
    expect(textField.value).toBe(title);
  });

  test('should call `createCheckList` with card.id and state of title upon press a submit button', () => {
    const { getByTestId } = render(
      <CardContext.Provider value={mockCard}>
        <CardSideBarCheckListButton createCheckList={createCheckList} />
      </CardContext.Provider>,
      store,
    );

    const title = 'jlx,jeo we';
    fireEvent.click(getByTestId('cardSideBarButton'));

    const textField = getByTestId('checkListFormTextField') as HTMLInputElement;
    fireEvent.change(textField, { target: { value: title } });
    fireEvent.click(getByTestId('buttonSubmit'));
    expect(createCheckList).toHaveBeenCalledWith(title, mockCard.id);
  });
});
