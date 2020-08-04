export const FETCH_FILES = 'FETCH_FILES';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const DELETE_FILE = 'DELETE_FILE';

export interface File {
  id: number
  displayName: string
  url: string
  contentType: string
  cardId: number
}

export interface FileState {
  files: File[]
}

interface FetchFilesAction {
  type: typeof FETCH_FILES
  payload: File[]
}

interface UploadFileAction {
  type: typeof UPLOAD_FILE
  payload: File
}

interface DeleteFileAction {
  type: typeof DELETE_FILE
  payload: number
}

export type FileActoinTypes = FetchFilesAction | UploadFileAction | DeleteFileAction;
