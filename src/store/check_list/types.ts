import { CheckListItem } from '../check_list_item/types';

export const CREATE_CHECK_LIST = 'CREATE_CHECK_LIST';

export interface CheckList {
  id: number
  title: string
  cardId: number
  items: CheckListItem[]
}

export interface CheckListState {
  checkLists: CheckList[]
}

type CreateCheckListAction = {
  type: typeof CREATE_CHECK_LIST
  payload: { checkList: CheckList, listId: number }
}

export type CheckListActionTypes = CreateCheckListAction;
