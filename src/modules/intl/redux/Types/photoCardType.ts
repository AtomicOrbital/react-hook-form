import { FetchPhotosFailureAction, FetchPhotosRequestAction, FetchPhotosSuccessAction, ResetPhotoTitlesAction, UpdatePhotoTitlesAction } from "../Action/photoAction";

export const FETCH_PHOTOS_REQUEST = "FETCH_PHOTOS_REQUEST";
export const FETCH_PHOTOS_SUCCESS = "FETCH_PHOTOS_SUCCESS";
export const FETCH_PHOTOS_FAILURE = "FETCH_PHOTOS_FAILURE";
export const UPDATE_PHOTO_TITLES = "UPDATE_PHOTO_TITLES";
export const RESET_PHOTO_TITLES = "RESET_PHOTO_TITLES";


export type PhotoActionTypes = 
  | FetchPhotosRequestAction
  | FetchPhotosSuccessAction
  | FetchPhotosFailureAction
  | UpdatePhotoTitlesAction
  | ResetPhotoTitlesAction;