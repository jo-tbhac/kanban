import { CheckListItem } from '../check_list_item/types';

export const FETCH_CHECK_LISTS = 'FETCH_CHECK_LISTS';
export const CREATE_CHECK_LIST = 'CREATE_CHECK_LIST';
export const UPDATE_CHECK_LIST = 'UPDATE_CHECK_LIST';
export const DELETE_CHECK_LIST = 'DELETE_CHECK_LIST';

export interface CheckList {
  id: number
  title: string
  cardId: number
  items: CheckListItem[]
}

export interface CheckListState {
  checkLists: CheckList[]
}

interface FetchCheckListsAction {
  type: typeof FETCH_CHECK_LISTS
  payload: CheckList[]
}

interface CreateCheckListAction {
  type: typeof CREATE_CHECK_LIST
  payload: CheckList
}

interface UpdateCheckListAction {
  type: typeof UPDATE_CHECK_LIST
  payload: { checkListId: number, title: string }
}

interface DeleteCheckListAction {
  type: typeof DELETE_CHECK_LIST
  payload: number
}

export type CheckListActionTypes =
  FetchCheckListsAction
  | CreateCheckListAction
  | UpdateCheckListAction
  | DeleteCheckListAction;
