import { Card } from '../card/types';

export const CREATE_LIST = 'CREATE_LIST';
export const UPDATE_LIST = 'UPDATE_LIST';

export interface List {
  id: number
  name: string
  boardId: number
  cards: Card[]
}

type CreateListAction = {
  type: typeof CREATE_LIST
  payload: List
}

type UpdateListAction = {
  type: typeof UPDATE_LIST
  payload: List
}

export type ListActionTypes = CreateListAction | UpdateListAction;
