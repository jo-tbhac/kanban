export const FETCH_BACKGROUND_IMAGES = 'FETCH_BACKGROUND_IMAGES';

export interface BackgroundImage {
  id: number
  url: string
}

export interface BoardBackgroundImage {
  boardId: number
  backgroundImageId: number
}

export interface BackgroundImageState {
  backgroundImages: BackgroundImage[]
}

type FetchBackgroundImagesAction = {
  type: typeof FETCH_BACKGROUND_IMAGES
  payload: BackgroundImage[]
}

export type BackgroundImageActionTypes = FetchBackgroundImagesAction;
