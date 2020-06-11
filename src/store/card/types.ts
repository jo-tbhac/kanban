import { Label } from '../label/types';


export interface Card {
  id: number
  title: string
  description: string
  listId: number
  labels: Label[]
}
