export const REDIRECT_TO_BOARD_INDEX = 'REDIRECT_TO_BOARD_INDEX';
export const INIT_REDIRECT_TO_BOARD_INDEX = 'INIT_REDIRECT_TO_BOARD_INDEX';

export interface RouteState {
  isRedirectToBoardIndex: boolean
}

interface RedirectToBoardIndexAction {
  type: typeof REDIRECT_TO_BOARD_INDEX
}

interface InitRedirectToBoardIndexAction {
  type: typeof INIT_REDIRECT_TO_BOARD_INDEX
}

export type RouteActionTypes = RedirectToBoardIndexAction | InitRedirectToBoardIndexAction;
