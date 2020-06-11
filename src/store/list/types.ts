import { Card } from '../card/types';

export interface List {
  id: number
  name: string
  boardId: number
  cards: Card[]
}
