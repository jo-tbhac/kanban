export const FETCH_ALL_LABEL = 'FETCH_ALL_LABEL';
export const CREATE_LABEL = 'CREATE_LABEL';
export const UPDATE_LABEL = 'UPDATE_LABEL';
export const DELETE_LABEL = 'DELETE_LABEL';
export const CHECK_LABEL = 'CHECK_LABEL';
export const UNCHECK_LABEL = 'UNCHECK_LABEL';

export interface Label {
  id: number
  name: string
  color: string
}

export interface LabelState {
  labels: Label[]
  selectedLabelIds: number[]
}

type FetchAllLabelAction = {
  type: typeof FETCH_ALL_LABEL
  payload: Label[]
}

type CreateLabelAction = {
  type: typeof CREATE_LABEL
  payload: Label
}

type UpdateLabelAction = {
  type: typeof UPDATE_LABEL
  payload: Label
}

type DeleteLabelAction = {
  type: typeof DELETE_LABEL
  payload: number
}

type CheckLabelAction = {
  type: typeof CHECK_LABEL
  payload: number
}

type UncheckLabelAction = {
  type: typeof UNCHECK_LABEL
  payload: number
}

export type LabelActionTypes =
  FetchAllLabelAction
  | CreateLabelAction
  | UpdateLabelAction
  | DeleteLabelAction
  | CheckLabelAction
  | UncheckLabelAction;
