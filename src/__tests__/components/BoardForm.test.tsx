import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../testUtils';
import { mockBoards } from '../../utils/mockData';
import { Store } from '../../store';
import { BoardForm } from '../../components/board/BoardForm';

describe('BoardForm component', () => {
  let createBoard: jest.Mock;
  let store: Store;
  beforeEach(() => {
    store = storeFactory();
    createBoard = jest.fn();
  });

  test('should show the new board button if state of `isFormVisible` is false', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <BoardForm boards={mockBoards} createBoard={createBoard} />,
      store,
    );

    expect(getByTestId('newBoardCard')).toBeVisible();
    expect(queryByTestId('newBoardForm')).toBeNull();
  });

  test('should show the new board form if state of `isFormVisible` is true', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <BoardForm boards={mockBoards} createBoard={createBoard} />,
      store,
    );
    fireEvent.click(getByTestId('newBoardCard'));
    expect(getByTestId('newBoardForm')).toBeVisible();
    expect(queryByTestId('newBoardCard')).toBeNull();
  });

  test('update state of `boardName` when the board name text field changed', () => {
    const { getByTestId } = renderWithRouter(
      <BoardForm boards={mockBoards} createBoard={createBoard} />,
      store,
    );
    fireEvent.click(getByTestId('newBoardCard'));

    const boardNameTextField = getByTestId('boardNameTextField') as HTMLInputElement;
    const createBoardButton = getByTestId('buttonSubmit') as HTMLButtonElement;

    expect(boardNameTextField.value).toBe('');

    const mockText = 'sample board';
    fireEvent.change(boardNameTextField, { target: { value: mockText } });
    expect(boardNameTextField.value).toBe(mockText);
    expect(createBoardButton.disabled).toBeFalsy();
  });

  test('disable a submit button if state of `boardName` is blank', () => {
    const { getByTestId } = renderWithRouter(
      <BoardForm boards={mockBoards} createBoard={createBoard} />,
      store,
    );
    fireEvent.click(getByTestId('newBoardCard'));

    const createBoardButton = getByTestId('buttonSubmit') as HTMLButtonElement;
    expect(createBoardButton.disabled).toBeTruthy();
  });

  test('should call `createBoard` with params of input name when click a submit button', () => {
    const { getByTestId } = renderWithRouter(
      <BoardForm boards={mockBoards} createBoard={createBoard} />,
      store,
    );
    fireEvent.click(getByTestId('newBoardCard'));

    const mockText = 'new board';
    const boardNameTextField = getByTestId('boardNameTextField') as HTMLInputElement;
    fireEvent.change(boardNameTextField, { target: { value: mockText } });
    fireEvent.click(getByTestId('buttonSubmit'));

    expect(createBoard).toHaveBeenCalledWith({ name: mockText });
  });
});
