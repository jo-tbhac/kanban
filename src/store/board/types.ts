import { List } from '../list/types';
import { BoardBackgroundImage } from '../background_image/types';

export const FETCH_ALL_BOARDS = 'FETCH_ALL_BOARDS';
export const FETCH_BOARD = 'FETCH_BOARD';
export const CREATE_BOARD = 'CREATE_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const UPDATE_BACKGROUND_IMAGE = 'UPDATE_BACKGROUND_IMAGE';

export interface BoardState {
  boards: Board[]
  selectedBoard: Board
}

export interface Board {
  id: number
  name: string
  updatedAt: string
  lists: List[]
  backgroundImage: BoardBackgroundImage | null
}

interface FetchAllBoardsAction {
  type: typeof FETCH_ALL_BOARDS
  payload: Board[]
}

interface FetchBoardAction {
  type: typeof FETCH_BOARD
  payload: Board
}

interface CreateBoardAction {
  type: typeof CREATE_BOARD
  payload: Board
}

interface UpdateBoardAction {
  type: typeof UPDATE_BOARD
  payload: Board
}

interface DeleteBoardAction {
  type: typeof DELETE_BOARD
  payload: number
}

interface UpdateBackgroundImage {
  type: typeof UPDATE_BACKGROUND_IMAGE
  payload: number
}

export type BoardActionTypes =
  FetchAllBoardsAction
  | FetchBoardAction
  | CreateBoardAction
  | UpdateBoardAction
  | DeleteBoardAction
  | UpdateBackgroundImage;
