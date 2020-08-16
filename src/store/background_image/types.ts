export const FETCH_BACKGROUND_IMAGES = 'FETCH_BACKGROUND_IMAGES';

export const darkTheme = 'dark';
export const lightTheme = 'light';

export type ThemeTypes = typeof darkTheme | typeof lightTheme;

export interface BackgroundImage {
  id: number
  url: string
  theme: ThemeTypes
}

export interface BoardBackgroundImage {
  boardId: number
  backgroundImageId: number
}

export interface BackgroundImageState {
  backgroundImages: BackgroundImage[]
}

interface FetchBackgroundImagesAction {
  type: typeof FETCH_BACKGROUND_IMAGES
  payload: BackgroundImage[]
}

export type BackgroundImageActionTypes = FetchBackgroundImagesAction;
