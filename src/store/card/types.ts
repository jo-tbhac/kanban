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

interface CreateCardAction {
  type: typeof CREATE_CARD
  payload: Card
}

interface UpdateCardAction {
  type: typeof UPDATE_CARD
  payload: Card
}

interface DeleteCardAction {
  type: typeof DELETE_CARD
  payload: { cardId: number, listId: number }
}

interface MoveCardAction {
  type: typeof MOVE_CARD
  payload: MoveCardPayload
}

interface MoveCardAcrossListAction {
  type: typeof MOVE_CARD_ACROSS_LIST
  payload: MoveCardAcrossListPayload
}

interface MoveCardToEmptyListAction {
  type: typeof MOVE_CARD_TO_EMPTY_LIST
  payload: MoveCardToEmptyListPayload
}

interface AttachLabelAction {
  type: typeof ATTACH_LABEL
  payload: CardLabelPayload
}

interface DetachLabelAction {
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
