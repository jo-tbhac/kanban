import { internalServerErrorTitle, internalServerErrorDescription } from '../../utils/text';

export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

export const dialogTypeSuccess = 0;
export const dialogTypeError = 1;
export const dialogTypeAsk = 2;

type DialogTypeSuccess = typeof dialogTypeSuccess;
type DialogTypeError = typeof dialogTypeError;
type DialogTypeAsk = typeof dialogTypeAsk;
export type DialogTypes = DialogTypeSuccess | DialogTypeError | DialogTypeAsk;

export const dialogInternalServerError = {
  type: dialogTypeError as DialogTypes,
  title: internalServerErrorTitle,
  description: internalServerErrorDescription,
};


export interface DialogState {
  isDialogVisible: boolean
  type: DialogTypes
  title: string
  description: string
  onConfirm: (() => void) | null
}

export interface DialogProps {
  type: DialogTypes
  title: string
  description?: string
  onConfirm?: () => void
}

interface OpenDialogAction {
  type: typeof OPEN_DIALOG
  payload: DialogProps
}

interface CloseDialogAction {
  type: typeof CLOSE_DIALOG
}

export type DialogActionTypes = OpenDialogAction | CloseDialogAction;
