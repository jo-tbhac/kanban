export const FETCH_ALL_LABEL = 'FETCH_ALL_LABEL';
export const CREATE_LABEL = 'CREATE_LABEL';

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

export type LabelActionTypes = FetchAllLabelAction | CreateLabelAction;
