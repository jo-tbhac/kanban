import { LOAD_START, LOAD_END } from './types';

export const loadStart = () => ({
  type: LOAD_START,
});

export const loadEnd = () => ({
  type: LOAD_END,
});
