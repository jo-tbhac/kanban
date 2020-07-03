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

type CreateListAction = {
  type: typeof CREATE_LIST
  payload: List
}

type UpdateListAction = {
  type: typeof UPDATE_LIST
  payload: List
}

type DeleteListAction = {
  type: typeof DELETE_LIST
  payload: number
}

type MoveListAction = {
  type: typeof MOVE_LIST
  payload: { dragId: number, dropId: number }
}

export type ListActionTypes =
  CreateListAction
  | UpdateListAction
  | DeleteListAction
  | MoveListAction;
