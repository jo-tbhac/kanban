export const READY = 'READY';
export const LOAD_START = 'LOAD_START';
export const LOAD_END = 'LOAD_END';

export interface LoadingState {
  ready: boolean
  isLoading: boolean
}

interface ReadyAction {
  type: typeof READY
}

interface LoadStartAction {
  type: typeof LOAD_START
}

interface LoadEndAction {
  type: typeof LOAD_END
}

export type LoadingActionTypes = ReadyAction | LoadStartAction | LoadEndAction;
