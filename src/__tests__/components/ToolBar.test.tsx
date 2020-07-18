import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import ToolBar from '../../components/common/ToolBar';

describe('ToolBar component', () => {
  let store: Store;
  beforeEach(() => {
    store = storeFactory();
  });

  test('exist a board name element when state `isFormVisible` is false', () => {
    const boardName = 'sample board';
    const { getByTestId } = renderWithRouter(<ToolBar boardName={boardName} />, store);

    expect(getByTestId('boardName')).toHaveTextContent(boardName);
  });

  test('exist a board name form when state `isFormVisible` is true', () => {
    const boardName = 'sample board';
    const { getByTestId } = renderWithRouter(<ToolBar boardName={boardName} />, store);

    fireEvent.click(getByTestId('boardName'));
    const boardNameForm = getByTestId('flexTextField') as HTMLInputElement;

    expect(boardNameForm.value).toBe(boardName);
  });
});
