import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../../testUtils';
import { mockBoards, mockBackgroundImage } from '../../../utils/mockData';
import { BackgroundImage } from '../../../store/background_image/types';
import { Store } from '../../../store';
import { BoardForm } from '../../../components/board/BoardForm';

describe('BoardForm component', () => {
  let createBoard: jest.Mock;
  let store: Store;
  let backgroundImages: BackgroundImage[];

  beforeEach(() => {
    store = storeFactory();
    createBoard = jest.fn();

    backgroundImages = [
      { ...mockBackgroundImage, id: 1, url: 'image1' },
      { ...mockBackgroundImage, id: 2, url: 'image2' },
      { ...mockBackgroundImage, id: 3, url: 'image3' },
    ] as BackgroundImage[];
  });

  test('should show the new board button if state of `isFormVisible` is false', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <BoardForm boards={mockBoards} createBoard={createBoard} backgroundImages={[]} />,
      store,
    );

    expect(getByTestId('newBoardCard')).toBeVisible();
    expect(queryByTestId('newBoardForm')).toBeNull();
  });

  test('should show the new board form if state of `isFormVisible` is true', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <BoardForm boards={mockBoards} createBoard={createBoard} backgroundImages={[]} />,
      store,
    );
    fireEvent.click(getByTestId('newBoardCard'));
    expect(getByTestId('newBoardForm')).toBeVisible();
    expect(queryByTestId('newBoardCard')).toBeNull();
  });

  test('update state of `boardName` when the board name text field changed', () => {
    const { getByTestId } = renderWithRouter(
      <BoardForm boards={mockBoards} createBoard={createBoard} backgroundImages={[]} />,
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
      <BoardForm boards={mockBoards} createBoard={createBoard} backgroundImages={[]} />,
      store,
    );
    fireEvent.click(getByTestId('newBoardCard'));

    const createBoardButton = getByTestId('buttonSubmit') as HTMLButtonElement;
    expect(createBoardButton.disabled).toBeTruthy();
  });

  test('should has a style of backgroundImage that has value of selected image url', () => {
    store = storeFactory({ backgroundImage: { backgroundImages } });

    const { getByTestId, getByAltText } = renderWithRouter(
      <BoardForm
        boards={mockBoards}
        createBoard={createBoard}
        backgroundImages={backgroundImages}
      />,
      store,
    );

    fireEvent.click(getByTestId('newBoardCard'));
    fireEvent.click(getByAltText('background1'));
    expect(getByTestId('newBoardForm')).toHaveStyle('background-image: url(image1)');
  });

  test('should call `createBoard` with params of input name when click a submit button', () => {
    store = storeFactory({ backgroundImage: { backgroundImages } });

    const { getByTestId, getByAltText } = renderWithRouter(
      <BoardForm
        boards={mockBoards}
        createBoard={createBoard}
        backgroundImages={backgroundImages}
      />,
      store,
    );

    fireEvent.click(getByTestId('newBoardCard'));
    fireEvent.click(getByAltText('background1'));

    const mockText = 'new board';
    const boardNameTextField = getByTestId('boardNameTextField') as HTMLInputElement;
    fireEvent.change(boardNameTextField, { target: { value: mockText } });
    fireEvent.click(getByTestId('buttonSubmit'));

    expect(createBoard).toHaveBeenCalledWith({ name: mockText, backgroundImageId: 1 });
  });
});
