import React from 'react';

import { renderWithRouter, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { darkTheme, lightTheme, BackgroundImage } from '../../../store/background_image/types';
import { fontColorDark, fontColorLight } from '../../../utils/utils';
import { mockBoard } from '../../../utils/mockData';
import { BoardWrapper } from '../../../components/board/BoardWrapper';

describe('BoardWrapper component', () => {
  let store: Store;

  beforeEach(() => {
    store = storeFactory();
  });

  test('should has a style `{ backgroundImage: ..., color: fontColorDark }` if props `backgroundImage` has `{ theme: dark }`', () => {
    const url = 'http://localhost/image';
    const board = { ...mockBoard, id: 1, backgroundImage: { boardId: 1, backgroundImageId: 2 } };
    const backgroundImages = [{ id: 2, theme: darkTheme, url }] as BackgroundImage[];

    const { getByTestId } = renderWithRouter(
      <BoardWrapper selectedBoard={board} backgroundImages={backgroundImages} />,
      store,
    );

    expect(getByTestId('boardWrapper')).toHaveStyle(`background-image: url(${url})`);
    expect(getByTestId('boardWrapper')).toHaveStyle(`color: ${fontColorDark}`);
  });

  test('should has a style `{ backgroundImage: ..., color: fontColorLight }` if props `backgroundImage` has `{ theme: light }`', () => {
    const url = 'http://localhost/image';
    const board = { ...mockBoard, id: 1, backgroundImage: { boardId: 1, backgroundImageId: 2 } };
    const backgroundImages = [{ id: 2, theme: lightTheme, url }] as BackgroundImage[];

    const { getByTestId } = renderWithRouter(
      <BoardWrapper selectedBoard={board} backgroundImages={backgroundImages} />,
      store,
    );

    expect(getByTestId('boardWrapper')).toHaveStyle(`background-image: url(${url})`);
    expect(getByTestId('boardWrapper')).toHaveStyle(`color: ${fontColorLight}`);
  });
});
