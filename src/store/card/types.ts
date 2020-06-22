import { Label } from '../label/types';

export const CREATE_CARD = 'CREATE_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';

export interface Card {
  id: number
  title: string
  description: string
  listId: number
  labels: Label[]
}

type CreateCardAction = {
  type: typeof CREATE_CARD
  payload: Card
}

type UpdateCardAction = {
  type: typeof UPDATE_CARD
  payload: Card
}

export type CardActionTypes = CreateCardAction | UpdateCardAction;
