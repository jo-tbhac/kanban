import { List } from '../list/types';

export const FETCH_ALL_BOARDS = 'FETCH_ALL_BOARDS';
export const FETCH_BOARD = 'FETCH_BOARD';

export interface BoardState {
  boards: Board[]
  selectedBoard: Board
}

export interface Board {
  id: number
  name: string
  updatedAt: string
  lists: List[]
}

interface FetchAllBoardsAction {
  type: typeof FETCH_ALL_BOARDS
  payload: Board[]
}

interface FetchBoardAction {
  type: typeof FETCH_BOARD
  payload: Board
}

export type BoardActionTypes = FetchAllBoardsAction | FetchBoardAction;
