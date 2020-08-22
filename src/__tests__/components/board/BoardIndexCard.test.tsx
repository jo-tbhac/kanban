import React, { ReactElement } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import { render, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { darkTheme, lightTheme, BackgroundImage } from '../../../store/background_image/types';
import { fontColorDark, fontColorLight } from '../../../utils/utils';
import { mockBoard, mockBackgroundImage } from '../../../utils/mockData';
import { BoardIndexCard } from '../../../components/board/BoardIndexCard';

describe('BoardIndex component', () => {
  let store: Store;
  let mockLocation: {pathname: string};
  let loadStart: jest.Mock;

  const renderWithRouter = (component: ReactElement, _store: Store) => (
    render(
      <MemoryRouter>
        {component}
        <Route
          path="*"
          render={({ location }) => {
            mockLocation = location;
            return null;
          }}
        />
      </MemoryRouter>,
      _store,
    )
  );

  beforeEach(() => {
    store = storeFactory();
    loadStart = jest.fn();
  });

  test('navigate to `/board/:boardId` when click a board index card', () => {
    const backgroundImages = [mockBackgroundImage] as BackgroundImage[];
    const { getByTestId } = renderWithRouter(
      <BoardIndexCard
        board={mockBoard}
        backgroundImages={backgroundImages}
        loadStart={loadStart}
      />,
      store,
    );

    fireEvent.click(getByTestId('boardIndexCard'));
    expect(mockLocation.pathname).toBe(`/board/${mockBoard.id}`);
  });

  test('should call `loadStart` when click a board index card', () => {
    const backgroundImages = [mockBackgroundImage] as BackgroundImage[];
    const { getByTestId } = renderWithRouter(
      <BoardIndexCard
        board={mockBoard}
        backgroundImages={backgroundImages}
        loadStart={loadStart}
      />,
      store,
    );

    fireEvent.click(getByTestId('boardIndexCard'));
    expect(loadStart).toHaveBeenCalled();
  });

  test('should has a style `{ backgroundImage: ..., color: fontColorDark }` if props `backgroundImage` has `{ theme: dark }`', () => {
    const url = 'http://localhost/image';
    const board = { ...mockBoard, id: 1, backgroundImage: { boardId: 1, backgroundImageId: 2 } };
    const backgroundImages = [{ id: 2, theme: darkTheme, url }] as BackgroundImage[];

    const { getByTestId } = renderWithRouter(
      <BoardIndexCard board={board} backgroundImages={backgroundImages} loadStart={loadStart} />,
      store,
    );

    expect(getByTestId('boardIndexCard')).toHaveStyle(`background-image: url(${url})`);
    expect(getByTestId('boardIndexCard')).toHaveStyle(`color: ${fontColorDark}`);
  });

  test('should has a style `{ backgroundImage: ..., color: fontColorLight }` if props `backgroundImage` has `{ theme: light }`', () => {
    const url = 'http://localhost/image';
    const board = { ...mockBoard, id: 1, backgroundImage: { boardId: 1, backgroundImageId: 2 } };
    const backgroundImages = [{ id: 2, theme: lightTheme, url }] as BackgroundImage[];

    const { getByTestId } = renderWithRouter(
      <BoardIndexCard board={board} backgroundImages={backgroundImages} loadStart={loadStart} />,
      store,
    );

    expect(getByTestId('boardIndexCard')).toHaveStyle(`background-image: url(${url})`);
    expect(getByTestId('boardIndexCard')).toHaveStyle(`color: ${fontColorLight}`);
  });

  test('should render a overlay component if a cursor enter the component', () => {
    const backgroundImages = [mockBackgroundImage] as BackgroundImage[];
    const { getByTestId } = renderWithRouter(
      <BoardIndexCard
        board={mockBoard}
        backgroundImages={backgroundImages}
        loadStart={loadStart}
      />,
      store,
    );

    fireEvent.mouseEnter(getByTestId('boardIndexCard'));
    expect(getByTestId('boardIndexCardOverlay')).not.toBeNull();
  });

  test('should not render a overlay component if a cursor leave from the component', () => {
    const backgroundImages = [mockBackgroundImage] as BackgroundImage[];
    const { queryByTestId, getByTestId } = renderWithRouter(
      <BoardIndexCard
        board={mockBoard}
        backgroundImages={backgroundImages}
        loadStart={loadStart}
      />,
      store,
    );

    fireEvent.mouseLeave(getByTestId('boardIndexCard'));
    expect(queryByTestId('boardIndexCardOverlay')).toBeNull();
  });
});
