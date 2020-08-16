import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../../testUtils';
import { editBackgroundImageText, deleteBoardText } from '../../../utils/text';
import { Store } from '../../../store';
import BoardMenu from '../../../components/board/BoardMenu';

describe('BoardMenu component', () => {
  let store: Store;
  let closeMenu: jest.Mock;

  beforeEach(() => {
    store = storeFactory();
    closeMenu = jest.fn();
  });

  test('should render `EditBackgroundImageButton` if state of `isImageVisible` is false', () => {
    const { getByText } = renderWithRouter(<BoardMenu closeMenu={closeMenu} />, store, ['/board/1']);
    expect(getByText(editBackgroundImageText)).not.toBeNull();
  });

  test('should render `DeleteBoardButton` if state of `isImageVisible` is false', () => {
    const { getByText } = renderWithRouter(<BoardMenu closeMenu={closeMenu} />, store, ['/board/1']);
    expect(getByText(deleteBoardText)).not.toBeNull();
  });

  test('should not render `EditBackgroundImageIndex` if state of `isImageVisible` is false', () => {
    const { queryByTestId } = renderWithRouter(
      <BoardMenu closeMenu={closeMenu} />,
      store,
      ['/board/1'],
    );
    expect(queryByTestId('editBackgroundImageIndex')).toBeNull();
  });

  test('should not render `EditBackgroundImageButton` if state of `isImageVisible` is true', () => {
    const { queryByText } = renderWithRouter(<BoardMenu closeMenu={closeMenu} />, store, ['/board/1']);
    expect(queryByText(editBackgroundImageText)).not.toBeNull();
  });

  test('should not render `DeleteBoardButton` if state of `isImageVisible` is true', () => {
    const { queryByText } = renderWithRouter(<BoardMenu closeMenu={closeMenu} />, store, ['/board/1']);
    expect(queryByText(deleteBoardText)).not.toBeNull();
  });

  test('should render `EditBackgroundImageIndex` if state of `isImageVisible` is true', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <BoardMenu closeMenu={closeMenu} />,
      store,
      ['/board/1'],
    );
    fireEvent.click(getByText(editBackgroundImageText));
    expect(getByTestId('editBackgroundImageIndex')).not.toBeNull();
  });
});
