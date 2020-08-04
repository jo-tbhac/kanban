export const SEARCH_CARD = 'SEARCH_CARD';
export const CLEAR_SEARCH_CARD_POOL = 'CLEAR_SEARCH_CARD_POOL';
export const ON_CHANGE_SEARCH_CARD_KEYWORD = 'ON_CHANGE_SEARCH_CARD_KEYWORD';
export const SEARCH_BOARD = 'SEARCH_BOARD';
export const CLEAR_SEARCH_BOARD_POOL = 'CLEAR_SEARCH_BOARD_POOL';
export const ON_CHANGE_SEARCH_BOARD_KEYWORD = 'ON_CHANGE_SEARCH_BOARD_KEYWORD';

export interface SearchState {
  cardIds: number[]
  cardKeyword: string
  isSearching: boolean
  boardIds: number[]
  boardKeyword: string
}

interface SearchCardAction {
  type: typeof SEARCH_CARD
  payload: number[]
}

interface ClearSearchCardPoolAction {
  type: typeof CLEAR_SEARCH_CARD_POOL
}

interface OnChangeSearchCardKeywordAction {
  type: typeof ON_CHANGE_SEARCH_CARD_KEYWORD
  payload: string
}

interface SearchBoardAction {
  type: typeof SEARCH_BOARD
  payload: number[]
}

interface ClearSearchBoardPoolAction {
  type: typeof CLEAR_SEARCH_BOARD_POOL
}

interface OnChangeSearchBoardKeywordAction {
  type: typeof ON_CHANGE_SEARCH_BOARD_KEYWORD
  payload: string
}

export type SearchActionTypes =
  SearchCardAction
  | ClearSearchCardPoolAction
  | OnChangeSearchCardKeywordAction
  | SearchBoardAction
  | ClearSearchBoardPoolAction
  | OnChangeSearchBoardKeywordAction;
