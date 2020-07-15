import { Card } from '../card/types';

export const SEARCH_CARD = 'SEARCH_CARD';
export const CLEAR_SEARCH_CARD_POOL = 'CLEAR_SEARCH_CARD_POOL';
export const ON_CHANGE_SEARCH_CARD_KEYWORD = 'ON_CHANGE_SEARCH_CARD_KEYWORD';

export interface SearchState {
  cards: Card[]
  keyword: string
  isSearching: boolean
}

type SearchCardAction = {
  type: typeof SEARCH_CARD
  payload: Card[]
}

type ClearSearchCardPoolAction = {
  type: typeof CLEAR_SEARCH_CARD_POOL
}

type OnChangeSearchCardKeywordAction = {
  type: typeof ON_CHANGE_SEARCH_CARD_KEYWORD
  payload: string
}

export type SearchActionTypes =
  SearchCardAction
  | ClearSearchCardPoolAction
  | OnChangeSearchCardKeywordAction;
