export const READY = 'READY';
export const LOAD_END = 'LOAD_END';

export interface LoadingState {
  ready: boolean
  isLoading: boolean
}

interface ReadyAction {
  type: typeof READY
}

interface LoadEndAction {
  type: typeof LOAD_END
}

export type LoadingActionTypes = ReadyAction | LoadEndAction;
