import React from 'react';
import { Route } from 'react-router-dom';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { Store } from '../../store';
import { BoardNameForm } from '../../components/board/BoardNameForm';

describe('BoardNameForm component', () => {
  let store: Store;
  let setFormVisible: jest.Mock;
  let updateBoard: jest.Mock;
  const initialBoardName = 'sample';

  beforeEach(() => {
    store = storeFactory();
    setFormVisible = jest.fn();
    updateBoard = jest.fn();
  });

  test('update state of `boardName` when the board name text field changed', () => {
    const { getByTestId } = renderWithRouter(
      <BoardNameForm
        updateBoard={updateBoard}
        setFormVisible={setFormVisible}
        initialBoardName={initialBoardName}
      />,
      store,
    );

    const boardNameForm = getByTestId('flexTextField') as HTMLInputElement;
    const inputBoardName = 'update';
    fireEvent.change(boardNameForm, { target: { value: inputBoardName } });

    expect(boardNameForm.value).toBe(inputBoardName);
  });

  test('should not call `updateBoard` if state of `boardName` is blank when focus out from a board name text field', () => {
    const { getByTestId } = renderWithRouter(
      <BoardNameForm
        updateBoard={updateBoard}
        setFormVisible={setFormVisible}
        initialBoardName={initialBoardName}
      />,
      store,
    );

    const boardNameForm = getByTestId('flexTextField') as HTMLInputElement;
    const inputBoardName = '';
    fireEvent.change(boardNameForm, { target: { value: inputBoardName } });
    fireEvent.blur(boardNameForm);

    expect(setFormVisible).toHaveBeenCalledWith(false);
    expect(updateBoard).not.toHaveBeenCalled();
  });

  test('should not call `updateBoard` if state of `boardName` has not changed when forcus out from a board name text field', () => {
    const { getByTestId } = renderWithRouter(
      <Route
        path="/board/:boardId"
        render={() => (
          <BoardNameForm
            updateBoard={updateBoard}
            setFormVisible={setFormVisible}
            initialBoardName={initialBoardName}
          />
        )}
      />,
      store,
      ['/board/1'],
    );

    const boardNameForm = getByTestId('flexTextField') as HTMLInputElement;
    const inputBoardName = 'sample';
    fireEvent.change(boardNameForm, { target: { value: inputBoardName } });
    fireEvent.blur(boardNameForm);

    expect(setFormVisible).toHaveBeenCalledWith(false);
    expect(updateBoard).not.toHaveBeenCalled();
  });

  test('should call `updateBoard` with params of input name and board id when focus out from a board name text field', () => {
    const boardId = 1;
    const { getByTestId } = renderWithRouter(
      <Route
        path="/board/:boardId"
        render={() => (
          <BoardNameForm
            updateBoard={updateBoard}
            setFormVisible={setFormVisible}
            initialBoardName={initialBoardName}
          />
        )}
      />,
      store,
      [`/board/${boardId}`],
    );

    const boardNameForm = getByTestId('flexTextField') as HTMLInputElement;
    const inputBoardName = 'updated board';
    fireEvent.change(boardNameForm, { target: { value: inputBoardName } });
    fireEvent.blur(boardNameForm);

    expect(setFormVisible).toHaveBeenCalledWith(false);
    expect(updateBoard).toHaveBeenCalledWith({ name: inputBoardName }, boardId);
  });
});
