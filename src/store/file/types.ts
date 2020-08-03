export const FETCH_FILES = 'FETCH_FILES';
export const UPLOAD_FILE = 'UPLOAD_FILE';

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

type FetchFilesAction = {
  type: typeof FETCH_FILES
  payload: File[]
}

type UploadFileAction = {
  type: typeof UPLOAD_FILE
  payload: File
}

export type FileActoinTypes = FetchFilesAction | UploadFileAction;
