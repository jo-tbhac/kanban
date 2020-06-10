import { OPEN_DIALOG, CLOSE_DIALOG, DialogProps } from './types';

export const openDialog = (payload: DialogProps) => ({
  type: OPEN_DIALOG,
  payload,
});

export const closeDialog = () => ({
  type: CLOSE_DIALOG,
});
