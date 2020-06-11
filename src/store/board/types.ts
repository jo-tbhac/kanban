export const SHOW_BOARD_INDEX = 'SHOW_BOARD_INDEX';
export const SHOW_BOARD = 'SHOW_BOARD';
export const FETCH_ALL_BOARDS = 'FETCH_ALL_BOARDS';

export interface BoardState {
  isIndexVisible: boolean
  boards: Board[]
  selectedBoard: Board
}

export interface ShowBoardParams {
  boardID: number
}

export interface Board {
  id: number
  name: string
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

interface FetchAllBoards {
  type: typeof FETCH_ALL_BOARDS
  payload: Board[]
}

export type BoardActionTypes = ShowBoardIndexAction | ShowBoardAction | FetchAllBoards;
