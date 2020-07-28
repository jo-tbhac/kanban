import React from 'react';

import { render, storeFactory, fireEvent } from '../../../testUtils';
import { Store } from '../../../store';
import { Checkbox } from '../../../components/check_list_item/Checkbox';

describe('Checkbox component', () => {
  let store: Store;
  let toggleCheck: jest.Mock;
  const itemId = 1;
  const checkListId = 2;

  beforeEach(() => {
    store = storeFactory();
    toggleCheck = jest.fn();
  });

  test('should have a class name `checkbox--checked` if props of `check` is true', () => {
    const { getByTestId } = render(
      <Checkbox check itemId={itemId} checkListId={checkListId} toggleCheck={toggleCheck} />,
      store,
    );
    expect(getByTestId('checkbox')).toHaveClass('checkbox--checked');
  });

  test('should have a class name `checkbox` if props of `check` is false', () => {
    const { getByTestId } = render(
      <Checkbox
        check={false}
        itemId={itemId}
        checkListId={checkListId}
        toggleCheck={toggleCheck}
      />,
      store,
    );
    expect(getByTestId('checkbox')).toHaveClass('checkbox');
  });

  test('should render a check icon if props of `check` is true', () => {
    const { getByTestId } = render(
      <Checkbox check itemId={itemId} checkListId={checkListId} toggleCheck={toggleCheck} />,
      store,
    );
    expect(getByTestId('checkboxIcon')).not.toBeNull();
  });

  test('should not render a check icon if props of `check` is false', () => {
    const { queryByTestId } = render(
      <Checkbox
        check={false}
        itemId={itemId}
        checkListId={checkListId}
        toggleCheck={toggleCheck}
      />,
      store,
    );
    expect(queryByTestId('checkboxIcon')).toBeNull();
  });

  test('should call `toggleCheck` with false upon click a checkbox', () => {
    const { getByTestId } = render(
      <Checkbox check itemId={itemId} checkListId={checkListId} toggleCheck={toggleCheck} />,
      store,
    );

    fireEvent.click(getByTestId('checkbox'));
    expect(toggleCheck).toHaveBeenCalledWith(false, itemId, checkListId);
  });

  test('should call `toggleCheck` with true upon click a checkbox', () => {
    const { getByTestId } = render(
      <Checkbox
        check={false}
        itemId={itemId}
        checkListId={checkListId}
        toggleCheck={toggleCheck}
      />,
      store,
    );

    fireEvent.click(getByTestId('checkbox'));
    expect(toggleCheck).toHaveBeenCalledWith(true, itemId, checkListId);
  });
});
