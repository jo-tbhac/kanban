export const FETCH_ALL_LABEL = 'FETCH_ALL_LABEL';

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

export type LabelActionTypes = FetchAllLabelAction;
