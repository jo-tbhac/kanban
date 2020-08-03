export const FETCH_FILES = 'FETCH_FILES';

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

export type FileActoinTypes = FetchFilesAction;
