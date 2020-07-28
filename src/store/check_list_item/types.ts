export const CREATE_CHECK_LIST_ITEM = 'CREATE_CHECK_LIST_ITEM';

export interface CheckListItem {
  id: number
  name: string
  check: boolean
  checkListId: number
}

type CreateCheckListItemAction = {
  type: typeof CREATE_CHECK_LIST_ITEM
  payload: CheckListItem
}

export type CheckListItemActionTypes = CreateCheckListItemAction;
