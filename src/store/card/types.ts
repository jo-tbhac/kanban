export const CREATE_CARD = 'CREATE_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const MOVE_CARD = 'MOVE_CARD';
export const MOVE_CARD_ACROSS_LIST = 'MOVE_CARD_ACROSS_LIST';
export const MOVE_CARD_TO_EMPTY_LIST = 'MOVE_CARD_TO_EMPTY_LIST';
export const ATTACH_LABEL = 'ATTACH_LABEL';
export const DETACH_LABEL = 'DETACH_LABEL';

export interface Card {
  id: number
  title: string
  description: string
  listId: number
  labels: { id: number }[]
  index: number
}

export interface DndLCard {
  type: string
  id: number
  index: number
  listId: number
}

export interface CardLabelPayload {
  listId: number
  cardId: number
  labelId: number
}

export interface MoveCardPayload {
  dropId: number
  dragId: number
  listId: number
}

export interface MoveCardAcrossListPayload {
  dropId: number
  dragId: number
  dropListId: number
  dragListId: number
}

export interface MoveCardToEmptyListPayload {
  dragId: number
  dropListId: number
  dragListId: number
}

type CreateCardAction = {
  type: typeof CREATE_CARD
  payload: Card
}

type UpdateCardAction = {
  type: typeof UPDATE_CARD
  payload: Card
}

type DeleteCardAction = {
  type: typeof DELETE_CARD
  payload: { cardId: number, listId: number }
}

type MoveCardAction = {
  type: typeof MOVE_CARD
  payload: MoveCardPayload
}

type MoveCardAcrossListAction = {
  type: typeof MOVE_CARD_ACROSS_LIST
  payload: MoveCardAcrossListPayload
}

type MoveCardToEmptyListAction = {
  type: typeof MOVE_CARD_TO_EMPTY_LIST
  payload: MoveCardToEmptyListPayload
}

type AttachLabelAction = {
  type: typeof ATTACH_LABEL
  payload: CardLabelPayload
}

type DetachLabelAction = {
  type: typeof DETACH_LABEL
  payload: CardLabelPayload
}

export type CardActionTypes =
  CreateCardAction
  | UpdateCardAction
  | DeleteCardAction
  | MoveCardAction
  | MoveCardAcrossListAction
  | MoveCardToEmptyListAction
  | AttachLabelAction
  | DetachLabelAction;
