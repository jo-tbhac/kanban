import React from 'react';
import { Route } from 'react-router-dom';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import BoardNameForm from '../../components/BoardNameForm';

describe('<BoardNameForm>', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('update state `boardName` upon changed board name text field', () => {
    const setFormVisible = jest.fn();
    const initialBoardName = 'sample';
    const { getByTestId } = renderWithRouter(
      <BoardNameForm setFormVisible={setFormVisible} initialBoardName={initialBoardName} />,
      store,
    );

    const boardNameForm = getByTestId('boardNameForm') as HTMLInputElement;
    const inputBoardName = 'update';
    fireEvent.change(boardNameForm, { target: { value: inputBoardName } });

    expect(boardNameForm.value).toBe(inputBoardName);
  });

  test('should not call updateBoard if state of `boardName` is blank when focus out from a board name text field', () => {
    const setFormVisible = jest.fn();
    const initialBoardName = 'sample';

    const { getByTestId } = renderWithRouter(
      <BoardNameForm setFormVisible={setFormVisible} initialBoardName={initialBoardName} />,
      store,
    );

    const boardNameForm = getByTestId('boardNameForm') as HTMLInputElement;
    const inputBoardName = '';
    fireEvent.change(boardNameForm, { target: { value: inputBoardName } });
    fireEvent.blur(boardNameForm);

    expect(setFormVisible).toHaveBeenCalledWith(false);
  });

  test('should not call `updateBoard` if state of `boardName` has not changed when forcus out from a board name text field', () => {
    const setFormVisible = jest.fn();
    const initialBoardName = 'sample';

    const { getByTestId } = renderWithRouter(
      <Route
        path="/board/:boardID"
        render={() => (
          <BoardNameForm setFormVisible={setFormVisible} initialBoardName={initialBoardName} />
        )}
      />,
      store,
      ['/board/1'],
    );

    const boardNameForm = getByTestId('boardNameForm') as HTMLInputElement;
    const inputBoardName = 'sample';
    fireEvent.change(boardNameForm, { target: { value: inputBoardName } });
    fireEvent.blur(boardNameForm);

    expect(setFormVisible).toHaveBeenCalledWith(false);
  });
});
