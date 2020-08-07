export const CREATE_COVER = 'CREATE_COVER';
export const UPDATE_COVER = 'UPDATE_COVER';
export const DELETE_COVER = 'DELETE_COVER';

export interface Cover {
  cardId: number
  fileId: number
}

interface CreateCoverAction {
  type: typeof CREATE_COVER
  payload: { cover: Cover, listId: number }
}

interface UpdateCoverAction {
  type: typeof UPDATE_COVER
  payload: { cover: Cover, listId: number }
}

interface DeleteCoverAction {
  type: typeof DELETE_COVER
  payload: { cardId: number, listId: number }
}

export type CoverActionTypes = CreateCoverAction | UpdateCoverAction | DeleteCoverAction;
