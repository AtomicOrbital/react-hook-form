import { FetchPhotosFailureAction, FetchPhotosRequestAction, FetchPhotosSuccessAction, ResetPhotoTitlesAction, UpdatePhotoTitlesAction } from "./Action/photoAction";
import {
  FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_FAILURE,
  UPDATE_PHOTO_TITLES,
  RESET_PHOTO_TITLES,
} from "./Types/photoCardType";

const initialState = {
  photos: [],
  loading: false,
  error: null,
};

export interface PhotoState {
  photos: Photo[];
  loading: boolean;
  error: string | null;
}

export type PhotoActionTypes = 
  | FetchPhotosRequestAction
  | FetchPhotosSuccessAction
  | FetchPhotosFailureAction
  | UpdatePhotoTitlesAction
  | ResetPhotoTitlesAction;


const photoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PHOTOS_REQUEST:
      return { ...state, loading: true };

    case FETCH_PHOTOS_SUCCESS:
      return { ...state, photos: action.payload, loading: false };

    case FETCH_PHOTOS_FAILURE:
      return { ...state, error: action.payload, loading: false };
      
    case UPDATE_PHOTO_TITLES:
      const updatedPhotos = state.photos.map((photo: any, index) => {
        if (action.payload[index]) {
          return { ...photo, title: action.payload[index] };
        } else {
          return photo;
        }
      });
      return { ...state, photos: updatedPhotos };
    case RESET_PHOTO_TITLES:
      console.log("action", action.payload)
      state.photos = action.payload
      return { ...state, photos: action.payload };
    default:
      return state;
  }
};

export default photoReducer;
