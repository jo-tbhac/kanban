export const FETCH_ALL_LABEL = 'FETCH_ALL_LABEL';
export const CREATE_LABEL = 'CREATE_LABEL';
export const UPDATE_LABEL = 'UPDATE_LABEL';
export const DELETE_LABEL = 'DELETE_LABEL';

export interface Label {
  id: number
  name: string
  color: string
}

export interface LabelState {
  labels: Label[]
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

export type LabelActionTypes =
  FetchAllLabelAction
  | CreateLabelAction
  | UpdateLabelAction
  | DeleteLabelAction;
