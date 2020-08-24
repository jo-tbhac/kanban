import { REDIRECT_TO_BOARD_INDEX, INIT_REDIRECT_TO_BOARD_INDEX } from './types';

export const redirectToBoardIndex = () => ({
  type: REDIRECT_TO_BOARD_INDEX,
});

export const initRedirectToBoardIndex = () => ({
  type: INIT_REDIRECT_TO_BOARD_INDEX,
});
