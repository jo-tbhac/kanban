import { CheckListItem } from '../check_list_item/types';

export const FETCH_CHECK_LISTS = 'FETCH_CHECK_LISTS';
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

type FetchCheckListsAction = {
  type: typeof FETCH_CHECK_LISTS
  payload: CheckList[]
}

type CreateCheckListAction = {
  type: typeof CREATE_CHECK_LIST
  payload: CheckList
}

export type CheckListActionTypes = FetchCheckListsAction | CreateCheckListAction;
