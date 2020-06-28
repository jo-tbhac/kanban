export const CREATE_CARD = 'CREATE_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const ATTACH_LABEL = 'ATTACH_LABEL';

export interface Card {
  id: number
  title: string
  description: string
  listId: number
  labels: { id: number }[]
}

export interface CardLabelPayload {
  listId: number
  cardId: number
  labelId: number
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

type AttachLabelAction = {
  type: typeof ATTACH_LABEL
  payload: CardLabelPayload
}

export type CardActionTypes =
  CreateCardAction
  | UpdateCardAction
  | DeleteCardAction
  | AttachLabelAction;
