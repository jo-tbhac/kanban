import React from 'react';

import { renderWithRouter, fireEvent, storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { darkTheme, lightTheme } from '../../../store/background_image/types';
import { fontColorDark, fontColorLight } from '../../../utils/utils';
import { ThemeContext } from '../../../components/board/BoardWrapper';
import ToolBar from '../../../components/common/ToolBar';

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

  test('should has a style `fontColorDark` if the theme that provide from context is `dark`', () => {
    const { getByTestId } = renderWithRouter(
      <ThemeContext.Provider value={darkTheme}>
        <ToolBar boardName="board" />
      </ThemeContext.Provider>,
      store,
    );

    expect(getByTestId('boardName')).toHaveStyle(`color: ${fontColorDark}`);
  });

  test('should has a style `fontColorLight` if the theme that provide from context is `light`', () => {
    const { getByTestId } = renderWithRouter(
      <ThemeContext.Provider value={lightTheme}>
        <ToolBar boardName="board" />
      </ThemeContext.Provider>,
      store,
    );

    expect(getByTestId('boardName')).toHaveStyle(`color: ${fontColorLight}`);
  });
});
