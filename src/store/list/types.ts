import { Card } from '../card/types';

export const CREATE_LIST = 'CREATE_LIST';
export const UPDATE_LIST = 'UPDATE_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const MOVE_LIST = 'MOVE_LIST';

export interface List {
  id: number
  name: string
  boardId: number
  cards: Card[]
  index: number
}

interface CreateListAction {
  type: typeof CREATE_LIST
  payload: List
}

interface UpdateListAction {
  type: typeof UPDATE_LIST
  payload: List
}

interface DeleteListAction {
  type: typeof DELETE_LIST
  payload: number
}

interface MoveListAction {
  type: typeof MOVE_LIST
  payload: { dragId: number, dropId: number }
}

export type ListActionTypes =
  CreateListAction
  | UpdateListAction
  | DeleteListAction
  | MoveListAction;
