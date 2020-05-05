export const SHOW_BOARD_INDEX = 'SHOW_BOARD_INDEX';
export const SHOW_BOARD = 'SHOW_BOARD';

export interface BoardState {
  isIndexVisible: boolean
  selectedBoard: Board
}

export interface ShowBoardParams {
  boardID: number
}

export interface Board {
  id: number
  title: string
  updatedAt: string
  lists: List[]
}

export interface List {
  id: number
  name: string
  cards: Card[]
}

export interface Card {
  id: number
  title: string
  description: string
}

interface ShowBoardIndexAction {
  type: typeof SHOW_BOARD_INDEX
}

interface ShowBoardAction {
  type: typeof SHOW_BOARD
  payload: Board
}

export type BoardActionTypes = ShowBoardIndexAction | ShowBoardAction;
