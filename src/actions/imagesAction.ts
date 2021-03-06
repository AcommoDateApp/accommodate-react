import { Dispatch } from "redux";
import { api } from "../api/client";
import { fetchBiography } from "./biographyActions";
import { finishSaving, startSaving } from "./editorActions";

export const uploadProfileImage = (image: File) => {
  return async (dispatch: Dispatch) => {
    dispatch(startSaving());
    await api.uploadProfileImage(image);

    await fetchBiography()(dispatch);
    await finishSaving()(dispatch);
  };
};

export const uploadRealEstateImage = (realEstateId: string, image: File) => {
  return async (dispatch: Dispatch) => {
    dispatch(startSaving());
    await api.uploadRealEstateImage(realEstateId, image);

    await fetchBiography()(dispatch);
    await finishSaving()(dispatch);
  };
};
