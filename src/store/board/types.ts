export const SHOW_BOARD_INDEX = 'SHOW_BOARD_INDEX';

export type BoardState = {
  isIndexVisible: boolean
}

type ShowBoardIndexAction = {
  type: typeof SHOW_BOARD_INDEX
}

export type BoardActionTypes = ShowBoardIndexAction;
