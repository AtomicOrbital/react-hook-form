import {
    FETCH_PHOTOS_REQUEST,
    FETCH_PHOTOS_SUCCESS,
    FETCH_PHOTOS_FAILURE,
    UPDATE_PHOTO_TITLES,
    RESET_PHOTO_TITLES,
} from "../Types/photoCardType";
import axios from "axios";
import { PhotoActionTypes } from "../photoReducer";

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string,
    thumbnaiUrl: string;
}

export interface UpdateTitles {
    [key: number]: string;
}

export interface FetchPhotosRequestAction {
    type: typeof FETCH_PHOTOS_REQUEST;
}

export interface FetchPhotosSuccessAction {
    type: typeof FETCH_PHOTOS_SUCCESS;
    payload: Photo[];
}

export interface FetchPhotosFailureAction {
    type: typeof FETCH_PHOTOS_FAILURE;
    payload: string;
}

export interface UpdatePhotoTitlesAction {
    type: typeof UPDATE_PHOTO_TITLES;
    payload: UpdateTitles;
}

export interface ResetPhotoTitlesAction {
    type: typeof RESET_PHOTO_TITLES;
}

// interface PhotoState {
//     photos: Photo[];
//     loading: boolean;
//     error: string | null;
// }

// export type PhotoActionTypes =| FetchPhotosRequestAction| FetchPhotosSuccessAction| FetchPhotosFailureAction| UpdatePhotoTitlesAction| ResetPhotoTitlesAction;

export const fetchPhotosRequest = ():PhotoActionTypes => {
    return {
        type: FETCH_PHOTOS_REQUEST,
    };
};

export const fetchPhotosSuccess = (photos: Photo[]):PhotoActionTypes => {
    return {
        type: FETCH_PHOTOS_SUCCESS,
        payload: photos,
    };
};

export const fetchPhotosFailure = (error: string):PhotoActionTypes => {
    return {
        type: FETCH_PHOTOS_FAILURE,
        payload: error,
    };
};

export const fetchPhotos = () => {
    return (dispatch: any) => {
        dispatch(fetchPhotosRequest());
        axios
            .get("https://jsonplaceholder.typicode.com/photos")
            .then((response) => {
                const photos = response.data;
                console.log("photos", photos);
                dispatch(fetchPhotosSuccess(photos));
            })
            .catch((error) => {
                console.log("error", error)
                const errorMessage = error.message;
                dispatch(fetchPhotosFailure(errorMessage));
            });
    };
};

export const updatePhotoTitles = (newTitles: UpdateTitles):PhotoActionTypes => {
    return {
        type: UPDATE_PHOTO_TITLES,
        payload: newTitles,
    };
};

export const resetPhotoTitles = () => {
    return (dispatch: any, getState: any) => {
      const { photos } = getState().photoReducer;
      const resetPhotos = photos.map((photo: any) => {
        return { ...photo, title: photo.title };
      });
      dispatch({ type: RESET_PHOTO_TITLES, payload: resetPhotos });
    };
  };
  
