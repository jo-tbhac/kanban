export const LOAD_END = 'LOAD_END';

export interface LoadingState {
  isLoading: boolean
}

interface LoadEndAction {
  type: typeof LOAD_END
}

export type LoadingActionTypes = LoadEndAction;
