export const CREATE_CHECK_LIST_ITEM = 'CREATE_CHECK_LIST_ITEM';
export const TOGGLE_CHECK = 'TOGGLE_CHECK';
export const UPDATE_CHECK_LIST_ITEM = 'UPDATE_CHECK_LIST_ITEM';

export interface CheckListItem {
  id: number
  name: string
  check: boolean
  checkListId: number
}

export interface ToggleCheckActionParams {
  check: boolean
  checkListId: number
  itemId: number
}

export interface UpdateCheckListItemActionParams {
  name: string
  checkListId: number
  itemId: number
}

type CreateCheckListItemAction = {
  type: typeof CREATE_CHECK_LIST_ITEM
  payload: CheckListItem
}

type ToggleCheckAction = {
  type: typeof TOGGLE_CHECK
  payload: ToggleCheckActionParams
}

type UpdateCheckListItemAction = {
  type: typeof UPDATE_CHECK_LIST_ITEM
  payload: UpdateCheckListItemActionParams
}

export type CheckListItemActionTypes =
  CreateCheckListItemAction
  | ToggleCheckAction
  | UpdateCheckListItemAction;
